import {PagesConfig} from "../config/pages.config.ts";
import { Home, Compass, Radio } from "lucide-react"

export const MENU_ITEMS = [
    {
        icon: Home,
        name: 'Home',
        link: PagesConfig.HOME
    },
    {
        icon: Compass,
        name: 'Discover',
        link: PagesConfig.DISCOVER
    },
    {
        icon: Radio,
        name: 'Radio',
        link: PagesConfig.RADIO
    }
]

export type TMenuItem = (typeof MENU_ITEMS)[number];

export const LIBRARY_MENU_ITEMS = [
    {
        name: 'Made For You',
        link: PagesConfig.MADE_FOR_YOU
    },
    {
        name: 'Recently Played',
        link: PagesConfig.RECENTLY_PLAYED
    },
    {
        name: 'Liked Songs',
        link: PagesConfig.LIKED_SONGS
    },
    {
        name: 'Albums',
        link: PagesConfig.ALBUMS()
    },
    {
        name: 'Artists',
        link: PagesConfig.ARTISTS()
    },
]