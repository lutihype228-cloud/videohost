export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  views: string;
  likes: number;
  timeAgo: string;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  text: string;
  timeAgo: string;
  likes: number;
}

export const latestVideos: Video[] = [
  {
    id: "krbrgr",
    title: "да стрим",
    thumbnail: "/video/image1.png",
    duration: "",
    author: { name: "monsy322", avatar: "https://ext.same-assets.com/37815594/1106025919.jpeg" },
    views: "1",
    likes: 0,
    timeAgo: "20 минут назад"
  },
  {
    id: "LHT42s",
    title: "",
    thumbnail: "/video/image2.png",
    duration: "0:15",
    author: { name: "TWIZZY", avatar: "https://ext.same-assets.com/37815594/3599635028.jpeg" },
    views: "11",
    likes: 0,
    timeAgo: "40 минут назад"
  },
  {
    id: "vIlYUZ",
    title: "",
    thumbnail: "/video/image3.png",
    duration: "0:08",
    author: { name: "TWIZZY", avatar: "https://ext.same-assets.com/37815594/3599635028.jpeg" },
    views: "9",
    likes: 0,
    timeAgo: "1 час назад"
  },
  {
    id: "WoEOIS",
    title: "",
    thumbnail: "/video/image4.png",
    duration: "0:16",
    author: { name: "universalvibe", avatar: "https://ext.same-assets.com/37815594/3644542078.jpeg", verified: true },
    views: "13",
    likes: 0,
    timeAgo: "1 час назад"
  }
];

export const feedVideos: Video[] = [
  {
    id: "OIiSJE",
    title: "Ona ne speshit",
    thumbnail: "/video/image1.png",
    duration: "0:10",
    author: { name: "band3r0_v1k1ng", avatar: "https://ext.same-assets.com/37815594/2649260806.jpeg", verified: true },
    views: "6.7K",
    likes: 24,
    timeAgo: "9 месяцев назад"
  },
  {
    id: "xzy6M",
    title: "LOL",
    thumbnail: "/video/image2.png",
    duration: "",
    author: { name: "ZHABINN", avatar: "https://ext.same-assets.com/37815594/3254522154.jpeg" },
    views: "3K",
    likes: 16,
    timeAgo: "11 месяцев назад"
  },
  {
    id: "waTefu",
    title: "Lord sipovka/gvakamole prime",
    thumbnail: "/video/image3.png",
    duration: "0:11",
    author: { name: "band3r0_v1k1ng", avatar: "https://ext.same-assets.com/37815594/2649260806.jpeg", verified: true },
    views: "5.1K",
    likes: 16,
    timeAgo: "9 месяцев назад"
  },
  {
    id: "v6uXQG",
    title: "Valyusha^^",
    thumbnail: "/video/image4.png",
    duration: "0:10",
    author: { name: "sergiqq1", avatar: "https://ext.same-assets.com/37815594/1489233986.png" },
    views: "3.4K",
    likes: 13,
    timeAgo: "9 месяцев назад"
  },
  {
    id: "UfuWi6",
    title: "SYSLOV171 Завоз года",
    thumbnail: "/video/image5.png",
    duration: "1:16",
    author: { name: "dimabusiness", avatar: "https://ext.same-assets.com/37815594/4127769276.png", verified: true },
    views: "658",
    likes: 16,
    timeAgo: "1 месяц назад"
  },
  {
    id: "ozDl4n",
    title: "Image",
    thumbnail: "/video/image6.png",
    duration: "",
    author: { name: "lagoda1337", avatar: "https://ext.same-assets.com/37815594/96416488.png", verified: true },
    views: "5K",
    likes: 9,
    timeAgo: "9 месяцев назад"
  },
  {
    id: "dOdIH3",
    title: "Джурк",
    thumbnail: "/video/image7.png",
    duration: "",
    author: { name: "Яблоко", avatar: "https://ext.same-assets.com/37815594/3964589412.jpeg" },
    views: "959",
    likes: 15,
    timeAgo: "3 недели назад"
  },
  {
    id: "Vat6jn",
    title: "IMG 1881",
    thumbnail: "/video/image8.png",
    duration: "1:08",
    author: { name: "Ssda", avatar: "https://ext.same-assets.com/37815594/2384001764.png" },
    views: "1K",
    likes: 17,
    timeAgo: "1 месяц назад"
  },
  {
    id: "nZ4lF4",
    title: "АХППХЗАЗВПХАПАВЗХ",
    thumbnail: "/video/image9.png",
    duration: "",
    author: { name: "Sp11tex", avatar: "https://ext.same-assets.com/37815594/2404946916.jpeg", verified: true },
    views: "444",
    likes: 13,
    timeAgo: "1 неделю назад"
  },
  {
    id: "ca11a",
    title: "Mld0yHY",
    thumbnail: "/video/image10.png",
    duration: "",
    author: { name: "holy", avatar: "https://ext.same-assets.com/37815594/2017163150.png" },
    views: "2.5K",
    likes: 11,
    timeAgo: "10 месяцев назад"
  },
  {
    id: "cNuUkS",
    title: "VID 20251101 181237 796",
    thumbnail: "/video/image11.png",
    duration: "0:10",
    author: { name: "universalvibe", avatar: "https://ext.same-assets.com/37815594/3644542078.jpeg", verified: true },
    views: "1.1K",
    likes: 11,
    timeAgo: "2 месяца назад"
  },
  {
    id: "AbpILo",
    title: "WW МАРК ГОМО",
    thumbnail: "/video/image1.png",
    duration: "0:30",
    author: { name: "TWIZZY", avatar: "https://ext.same-assets.com/37815594/3599635028.jpeg", verified: true },
    views: "586",
    likes: 7,
    timeAgo: "1 неделю назад"
  }
];

export const sampleComments: Comment[] = [
  {
    id: "1",
    author: { name: "Shkk1per_240km", avatar: "https://ext.same-assets.com/37815594/3057832694.jpeg" },
    text: ")",
    timeAgo: "9 дней назад",
    likes: 0
  },
  {
    id: "2",
    author: { name: "VRX", avatar: "https://ext.same-assets.com/37815594/763042945.jpeg" },
    text: "цццц ь",
    timeAgo: "9 дней назад",
    likes: 0
  },
  {
    id: "3",
    author: { name: "ne_kiriiyuxa", avatar: "https://ext.same-assets.com/37815594/260850791.jpeg", verified: true },
    text: "w",
    timeAgo: "14 дней назад",
    likes: 0
  },
  {
    id: "4",
    author: { name: "noshi", avatar: "https://ext.same-assets.com/37815594/2611614348.png" },
    text: "w",
    timeAgo: "16 дней назад",
    likes: 0
  },
  {
    id: "5",
    author: { name: "OCHOBA_B_bAHE---ProDim", avatar: "https://ext.same-assets.com/37815594/1218498527.jpeg", verified: true },
    text: "🔥",
    timeAgo: "16 дней назад",
    likes: 0
  },
  {
    id: "6",
    author: { name: "fasdfgdsf", avatar: "https://ext.same-assets.com/37815594/2344314784.png" },
    text: "<",
    timeAgo: "6 месяцев назад",
    likes: 1
  },
  {
    id: "7",
    author: { name: "zxcsv", avatar: "https://ext.same-assets.com/37815594/3445613695.png" },
    text: "вoy вoy",
    timeAgo: "6 месяцев назад",
    likes: 0
  }
];

export const recommendedVideos: Video[] = [
  {
    id: "ozDl4n",
    title: "",
    thumbnail: "/video/image6.png",
    duration: "",
    author: { name: "lagoda1337", avatar: "https://ext.same-assets.com/37815594/2696983713.png" },
    views: "5.0K",
    likes: 0,
    timeAgo: "9 месяцев назад"
  },
  {
    id: "waTefu",
    title: "",
    thumbnail: "/video/image7.png",
    duration: "0:10",
    author: { name: "band3r0_v1k1ng", avatar: "https://ext.same-assets.com/37815594/806831169.jpeg", verified: true },
    views: "6.7K",
    likes: 0,
    timeAgo: "10 месяцев назад"
  },
  {
    id: "fulltilt27",
    title: "",
    thumbnail: "/video/image8.png",
    duration: "",
    author: { name: "fulltilt27", avatar: "https://ext.same-assets.com/37815594/1905600941.png" },
    views: "982",
    likes: 0,
    timeAgo: "13 дней назад"
  },
  {
    id: "W7aSeu",
    title: "",
    thumbnail: "/video/image9.png",
    duration: "0:09",
    author: { name: "artemido4ek", avatar: "https://ext.same-assets.com/37815594/564988170.jpeg" },
    views: "69",
    likes: 0,
    timeAgo: "5 часов назад"
  },
  {
    id: "AbpILo2",
    title: "",
    thumbnail: "/video/image10.png",
    duration: "0:30",
    author: { name: "TWIZZY", avatar: "https://ext.same-assets.com/37815594/2051386273.jpeg" },
    views: "584",
    likes: 0,
    timeAgo: "11 дней назад"
  },
  {
    id: "v6uXQG2",
    title: "",
    thumbnail: "/video/image11.png",
    duration: "0:10",
    author: { name: "sergiqq1", avatar: "https://ext.same-assets.com/37815594/1654252853.png" },
    views: "3.4K",
    likes: 0,
    timeAgo: "9 месяцев назад"
  },
  {
    id: "SPASUBOOO",
    title: "",
    thumbnail: "/video/image1.png",
    duration: "",
    author: { name: "SPASUBOOO", avatar: "https://ext.same-assets.com/37815594/3530382728.png" },
    views: "583",
    likes: 0,
    timeAgo: "около 1 месяца назад"
  },
  {
    id: "SlYSaj",
    title: "",
    thumbnail: "/video/image2.png",
    duration: "2:42",
    author: { name: "Cherep", avatar: "https://ext.same-assets.com/37815594/4081029136.png" },
    views: "310",
    likes: 0,
    timeAgo: "3 дня назад"
  }
];

export const currentVideo: Video & { videoUrl: string } = {
  id: "OIiSJE",
  title: "ona ne speshit",
  thumbnail: "/video/image1.png",
  duration: "0:10",
  videoUrl: "/video/Driving%20to%20the%20banana%20store.mp4",
  author: { name: "band3r0_v1k1ng", avatar: "https://ext.same-assets.com/37815594/806831169.jpeg", verified: true },
  views: "6.7K",
  likes: 24,
  timeAgo: "10 месяцев назад"
};
