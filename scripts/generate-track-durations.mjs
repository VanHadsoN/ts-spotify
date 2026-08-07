import { readdir, rename, writeFile } from "node:fs/promises";
import { extname, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseFile } from "music-metadata";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");

const audioDirectory = resolve(projectRoot, "public", "audio");
const outputFile = join(
    projectRoot,
    "src",
    "data",
    "track-durations.generated.ts",
);

const temporaryOutputFile = `${outputFile}.tmp`;

const getDuration = async (filePath) => {
    const metadata = await parseFile(filePath);
    const duration = metadata.format.duration;

    if(!Number.isFinite(duration) || duration <= 0) {
        throw new Error(`Invalid duration: ${filePath}`);
    }

    return Math.floor(duration);
};

const generateDurations = async () => {
    const directoryEntries = await readdir(audioDirectory, {
        withFileTypes: true,
    });

    const audioFiles = directoryEntries
        .filter(
            (entry) => entry.isFile() && extname(entry.name).toLowerCase() === ".mp3",
        )
        .map((entry) => entry.name)
        .sort();

    if(audioFiles.length === 0) {
        throw new Error(`No audio file found for audio directory: ${audioDirectory}`);
    }

    const durations = await Promise.all(
        audioFiles.map(async (fileName) => {
            const filePath = join(audioDirectory, fileName);
            const publicPath = `/audio/${fileName}`;
            const duration = await getDuration(filePath);

            return [publicPath, duration];
        }),
    );

    const entries = durations
        .map(([filePath, duration]) => `${JSON.stringify(filePath)}: ${duration},`,)
        .join("\n");

    const generatedFile = `// Этот файл создан автоматически.
        // Не редактируйте его вручную.

        export const TRACK_DURATIONS = Object.freeze({${entries}});`;

    await writeFile(temporaryOutputFile, generatedFile, "utf8");
    await rename(temporaryOutputFile, outputFile);

    console.log(`${audioFiles.length} tracks have been recorded to ${outputFile}`);
    };

generateDurations().catch((error) => {
    console.error("Duration generation error:", error);
    process.exitCode = 1;
});
