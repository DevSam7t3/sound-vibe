export interface RootObject {
  artists: Artists;
  tracks: Tracks;
}

export interface Artists {
  hits: ArtistsHit[];
}

export interface ArtistsHit {
  artist: HitArtist;
}

export interface HitArtist {
  adamid: string;
  avatar: string;
  name: string;
  verified: boolean;
  weburl: string;
}

export interface Tracks {
  hits: TracksHit[];
}

export interface TracksHit {
  track: Track;
}

export interface Track {
  artists: ArtistElement[];
  hub: Hub;
  images: TrackImages;
  key: string;
  layout: string;
  share: Share;
  subtitle: string;
  title: string;
  type: string;
  url: string;
}

export interface ArtistElement {
  adamid: string;
  id: string;
}

export interface Hub {
  actions: Action[];
  displayname: string;
  explicit: boolean;
  image: string;
  options: Option[];
  providers: Provider[];
  type: string;
}

export interface Action {
  id?: string;
  name?: Name;
  type: ActionType;
  uri?: string;
}

export enum Name {
  Apple = "apple",
  HubApplemusicDeeplink = "hub:applemusic:deeplink",
  HubDeezerSearchdeeplink = "hub:deezer:searchdeeplink",
  HubSpotifySearchdeeplink = "hub:spotify:searchdeeplink",
}

export enum ActionType {
  Applemusicopen = "applemusicopen",
  Applemusicplay = "applemusicplay",
  URI = "uri",
}

export interface Option {
  actions: Action[];
  beacondata: Beacondata;
  caption: OptionCaption;
  colouroverflowimage: boolean;
  image: string;
  listcaption: Listcaption;
  overflowimage: string;
  providername: Providername;
  type: BeacondataType;
}

export interface Beacondata {
  providername: Providername;
  type: BeacondataType;
}

export enum Providername {
  Applemusic = "applemusic",
  Itunes = "itunes",
}

export enum BeacondataType {
  Buy = "buy",
  Open = "open",
}

export enum OptionCaption {
  Buy = "BUY",
  Open = "OPEN",
}

export enum Listcaption {
  BuyOnITunes = "Buy on iTunes",
  OpenInAppleMusic = "Open in Apple Music",
}

export interface Provider {
  actions: Action[];
  caption: ProviderCaption;
  images: ProviderImages;
  type: ProviderType;
}

export enum ProviderCaption {
  OpenInDeezer = "Open in Deezer",
  OpenInSpotify = "Open in Spotify",
}

export interface ProviderImages {
  default: string;
  overflow: string;
}

export enum ProviderType {
  Deezer = "DEEZER",
  Spotify = "SPOTIFY",
}

export interface TrackImages {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}

export interface Share {
  avatar: string;
  href: string;
  html: string;
  image: string;
  snapchat: string;
  subject: string;
  text: string;
  twitter: string;
}
