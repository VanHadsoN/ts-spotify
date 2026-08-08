import { TRACKS } from '@/data/tracks.data.ts'

export interface ILyricsLine {
	time: number
	text: string
	section?: string
}

export interface ILyrics {
	trackId: string
	lines: ILyricsLine[]
}

const getTrackId = (file: string): string => {
	const track = TRACKS.find((item) => item.file === file)

	if (!track) {
		throw new Error(`Lyrics reference an unknown track: ${file}`)
	}

	return track.id
}

export const LYRICS: ILyrics[] = [
	{
		trackId: getTrackId('/audio/aerosmith-train-kept-a-rollin.mp3'),
		lines: [
			{ time: 23.32, section: 'Verse 1', text: 'Well, on a train, I met a dame' },
			{ time: 25.92, text: 'She rather handsome, we kinda looked the same' },
			{ time: 28.52, text: 'She was pretty, from New York City' },
			{ time: 31.12, text: "I'm walking down that old fair lane" },
			{ time: 33.46, text: "I'm in heat, I'm in love, but I just couldn't tell her so" },
			{ time: 37.56, section: 'Chorus', text: 'I said, train kept a-rollin’ all night long' },
			{ time: 40.64, text: 'Train kept a-rollin’ all night long' },
			{ time: 43, text: 'Train kept a-rollin’ all night long' },
			{ time: 45.22, text: 'Train kept a-rollin’ all night long' },
			{ time: 47.52, text: "I'm in heat, I'm in love, but I just couldn't tell her so" },
			{ time: 51.6, text: 'No, no, no' },
			{ time: 65.8, section: 'Bridge', text: 'Well, get along, sweet little woman, get along' },
			{ time: 169.98, section: 'Verse 2', text: 'Yeah, on a train, I met a dame' },
			{ time: 175.26, text: 'She was pretty, from New York City' },
			{ time: 177.92, text: "I'm walking down that old fair lane" },
			{ time: 180.26, text: "I'm in heat, I'm in love" },
			{ time: 182.36, text: "But I just couldn't tell her so" },
			{ time: 185.02, section: 'Chorus', text: 'I said, train kept a-rollin’ all night long' },
			{ time: 188.26, text: 'Train kept a-rollin’ all night long' },
			{ time: 190.32, text: 'Train kept a-rollin’ all night long' },
			{ time: 192.64, text: 'Train kept a-rollin’ all night long' },
			{ time: 195.06, text: "I'm in heat, I'm in love" },
			{ time: 197.18, text: "But I just couldn't tell her so" },
			{ time: 214.12, section: 'Bridge', text: 'Well, get along, sweet little woman, get along' },
			{ time: 294.56, section: 'Chorus', text: 'I said, train kept a-rollin’ all night long' },
			{ time: 297.6, text: 'Train kept a-rollin’ all night long' },
			{ time: 300.16, text: 'Train kept a-rollin’ all night long' },
			{ time: 302.54, text: 'Train kept a-rollin’ all night long' },
			{ time: 307.58, text: "But I just couldn't tell her so" },
		],
	},
	{
		trackId: getTrackId('/audio/creedence-clearwater-revival-green-river.mp3'),
		lines: [
			{ time: 12.06, section: 'Verse 1', text: 'Well, take me back down where cool water flow, yeah' },
			{ time: 19.96, text: 'Let me remember things I love' },
			{ time: 27.16, text: "Stoppin' at the log where catfish bite" },
			{ time: 30.58, text: "Walkin' along the river road at night" },
			{ time: 34.14, text: "Barefoot girls dancin' in the moonlight" },
			{ time: 41.16, text: "I can hear the bullfrog callin' me" },
			{ time: 48.16, text: "Wonder if my rope's still hangin' to the tree" },
			{ time: 54.12, text: "Love to kick my feet 'way down the shallow water" },
			{ time: 57.78, text: 'Shoofly, dragonfly, get back to your mother' },
			{ time: 61.16, text: 'Pick up a flat rock, skip it across Green River' },
			{ time: 91.6, section: 'Verse 2', text: "Up at Cody's camp I spent my days, oh" },
			{ time: 98.14, text: 'With flat-car riders and cross-tie walkers' },
			{ time: 105.14, text: 'Old Cody Junior took me over' },
			{ time: 108.66, text: "Said, you're gonna find the world is smoulderin'" },
			{ time: 111.78, text: 'And if you get lost, come on home to Green River' },
		],
	},
	{
		trackId: getTrackId('/audio/maneskin-zitti-e-buoni.mp3'),
		lines: [
			{ time: 10.38, section: 'Verse 1', text: "Loro non sanno di che parlo, voi siete sporchi, fra', di fango" },
			{ time: 15.26, text: 'Giallo di siga fra le dita, io con la siga camminando' },
			{ time: 19.84, text: 'Scusami, ma ci credo tanto che posso fare questo salto' },
			{ time: 24.7, text: 'E anche se la strada è in salita, per questo ora mi sto allenando' },
			{ time: 28.34, text: 'Buonasera, signore e signori, fuori gli attori' },
			{ time: 31.48, text: 'Vi conviene toccarvi i coglioni' },
			{ time: 33.7, text: 'Vi conviene stare zitti e buoni' },
			{ time: 35.92, text: 'Qui la gente è strana, tipo spacciatori' },
			{ time: 38.28, text: 'Troppe notti stavo chiuso fuori' },
			{ time: 40.78, text: 'Mo li prendo a calci ’sti portoni' },
			{ time: 43.1, text: 'Sguardo in alto tipo scalatori' },
			{ time: 45.2, text: 'Quindi scusa mamma se sto sempre fuori, ma' },
			{ time: 48.1, section: 'Chorus', text: 'Sono fuori di testa, ma diverso da loro' },
			{ time: 52.1, text: 'E tu sei fuori di testa, ma diversa da loro' },
			{ time: 57.3, text: 'Siamo fuori di testa, ma diversi da loro' },
			{ time: 61.48, text: 'Siamo fuori di testa, ma diversi da loro' },
			{ time: 74.18, section: 'Verse 2', text: 'Io ho scritto pagine e pagine, ho visto sale, poi lacrime' },
			{ time: 77.3, text: 'Questi uomini in macchina, non scalare le rapide' },
			{ time: 79.6, text: "Scritto sopra una lapide, in casa mia non c'è Dio" },
			{ time: 81.68, text: 'Ma se trovi il senso del tempo, risalirai dal tuo oblio' },
			{ time: 84.08, text: 'E non c’è vento che fermi la naturale potenza' },
			{ time: 86.5, text: 'Dal punto giusto di vista, del vento senti l’ebrezza' },
			{ time: 88.86, text: 'Con ali in cera alla schiena, ricercherò quell’altezza' },
			{ time: 91.14, text: 'Se vuoi fermarmi ritenta, prova a tagliarmi la testa' },
			{ time: 93.5, section: 'Chorus', text: 'Perché sono fuori di testa, ma diverso da loro' },
			{ time: 98.72, text: 'E tu sei fuori di testa, ma diversa da loro' },
			{ time: 103.64, text: 'Siamo fuori di testa, ma diversi da loro' },
			{ time: 108.36, text: 'Siamo fuori di testa, ma diversi da loro' },
			{ time: 122, section: 'Bridge', text: 'Parla, la gente purtroppo parla, non sa di che cosa parla' },
			{ time: 131.12, text: 'Parla, la gente purtroppo parla, non sa di che cosa parla' },
			{ time: 136.52, text: 'Tu portami dove sto a galla, che qui mi manca l’aria' },
			{ time: 140.36, text: 'Parla, la gente purtroppo parla, non sa di che cazzo parla' },
			{ time: 145.88, text: 'Tu portami dove sto a galla, che qui mi manca l’aria' },
			{ time: 152.5, section: 'Chorus', text: 'Ma sono fuori di testa, ma diversa da loro' },
			{ time: 157.18, text: 'E tu sei fuori di testa, ma diversa da loro' },
			{ time: 161.76, text: 'Siamo fuori di testa, ma diversi da loro' },
			{ time: 166.54, text: 'Siamo fuori di testa, ma diversi da loro' },
			{ time: 187.18, section: 'Outro', text: 'Noi siamo diversi da loro' },
		],
	},
	{
		trackId: getTrackId('/audio/oasis-little-by-little.mp3'),
		lines: [
			{ time: 15.88, section: 'Verse 1', text: "We the people fight for our existence, we don't claim to be perfect, but we're free" },
			{ time: 29.02, text: 'We dream our dreams alone with no resistance' },
			{ time: 36.3, text: 'Fading like the stars we wish to be' },
			{ time: 41.88, text: "You know I didn't mean what I just said" },
			{ time: 48.56, text: 'But my God woke up on the wrong side of His bed' },
			{ time: 53.88, text: "And it just don't matter now" },
			{ time: 56.82, section: 'Chorus', text: 'Little by little, we gave you everything you ever dreamed of' },
			{ time: 63.44, text: 'Little by little, the wheels of your life have slowly fallen off' },
			{ time: 70.02, text: 'Little by little, you have to give it all in all your life' },
			{ time: 76.5, text: 'And all the time I just ask myself why' },
			{ time: 81.54, text: "You're really here" },
			{ time: 84.66, section: 'Verse 2', text: 'True perfection has to be imperfect' },
			{ time: 91.64, text: "I know that that sounds foolish, but it's true" },
			{ time: 98.66, text: "The day has come, now you'll have to accept" },
			{ time: 104.66, text: 'The life inside your head we give to you' },
			{ time: 109.66, text: "You know I didn't mean what I just said" },
			{ time: 117.44, text: 'But my God woke up on the wrong side of His bed' },
			{ time: 122.96, text: "And it just don't matter now" },
			{ time: 125.98, section: 'Chorus', text: 'Little by little, we gave you everything you ever dreamed of' },
			{ time: 132.46, text: 'Little by little, the wheels of your life have slowly fallen off' },
			{ time: 139, text: 'Little by little, you have to give it all in all your life' },
			{ time: 147.36, text: 'And all the time I just ask myself why you’re really here' },
			{ time: 178.1, section: 'Chorus', text: 'Little by little, we gave you everything you ever dreamed of' },
			{ time: 185.12, text: 'Little by little, the wheels of your life have slowly fallen off' },
			{ time: 191.76, text: 'Little by little, you have to give it all in all your life' },
			{ time: 198.3, text: 'And all the time I just ask myself why you’re really here' },
			{ time: 214.82, section: 'Outro', text: 'Why am I really here?' },
			{ time: 221.76, text: 'Why am I really here?' },
		],
	},
	{
		trackId: getTrackId('/audio/trevor-jones-last-of-the-mohikans-theme.mp3'),
		lines: [
			{ time: 0, section: 'Instrumental', text: '♪ The Last of the Mohicans — Main Theme ♪' },
		],
	},
]
