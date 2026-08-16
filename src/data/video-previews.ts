// Shared lazy-loaded video previews for project cards — used by both the homepage's featured
// ProjectFeature cards and the /work page's ProjectEntry cards, so a project keeps the same
// video treatment wherever it appears. Keyed by the projects collection entry `id`. Source GIFs
// live in src/assets/img/ and are intentionally not read through astro:assets — animated GIFs are
// flattened to a single static frame by the image pipeline, so the video files here were
// pre-rendered once (ffmpeg, webm/vp9 + mp4/h264, muted/looping) and committed under public/.
export interface VideoPreview {
  webm: string;
  mp4: string;
  poster: string;
  /** Intrinsic encoded dimensions — kept alongside the files so every <video> ships explicit
   * width/height even though CSS (aspect-ratio on the card's media container) is what actually
   * prevents layout shift; this is the same explicit-dimensions guarantee astro:assets gives
   * <Image>, applied by hand since these are raw <video> elements. */
  width: number;
  height: number;
}

export const videoPreviews: Record<string, VideoPreview> = {
  'bbox-mask-pose': {
    webm: '/assets/videos/project-previews/bbox-mask-pose.webm',
    mp4: '/assets/videos/project-previews/bbox-mask-pose.mp4',
    poster: '/assets/img/project-previews/bbox-mask-pose.webp',
    width: 516,
    height: 718,
  },
  probpose: {
    webm: '/assets/videos/project-previews/probpose.webm',
    mp4: '/assets/videos/project-previews/probpose.mp4',
    poster: '/assets/img/project-previews/probpose.webp',
    width: 1080,
    height: 570,
  },
  repogen: {
    webm: '/assets/videos/project-previews/repogen.webm',
    mp4: '/assets/videos/project-previews/repogen.mp4',
    poster: '/assets/img/project-previews/repogen.webp',
    width: 640,
    height: 382,
  },
};
