// Free placeholder photos from picsum.photos (Unsplash-sourced, free to use).
// To use church-themed photos, download free images from unsplash.com / pexels.com,
// drop them in /public/images and replace the URLs below, e.g. "/images/youth.jpg".
const p = (seed, w = 900, h = 640) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
export const IMG = {
  ministries: {
    Children: p("rkdm-children"), Youth: p("rkdm-youth"), Families: p("rkdm-families"),
    "Worship and Media": p("rkdm-worship"), Outreach: p("rkdm-outreach"), "Prayer Team": p("rkdm-prayer"),
  },
  sermons: [p("rkdm-sermon-1"), p("rkdm-sermon-2"), p("rkdm-sermon-3")],
  events: [p("rkdm-event-1"), p("rkdm-event-2"), p("rkdm-event-3")],
};
