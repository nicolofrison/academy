export default interface IVideo {
  id: number,
  title: string,
  description: string,
  genre: string,
  duration: string,
  actors: string,
  releaseDate: string,
  creationDate: string,
  quality?: string,
  type: 'movie' | 'serie',
  href: string
}
