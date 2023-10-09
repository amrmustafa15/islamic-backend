import { db } from "./db.js";

const main = async () => {
  await db.socialMedia.createMany({
    data: [
      {
        id: "facebook",
        name: "Facebook",
        url: "https://www.facebook.com/",
      },
      {
        id: "x",
        name: "x",
        url: "https://www.twitter.com/",
      },
      {
        id: "whatsapp",
        name: "WhatsApp",
        url: "https://www.instagram.com/7amdy",
      },
      {
        id: "youtube",
        name: "YouTube",
        url: "https://www.youtube.com",
      },
    ],
  });
  // await db.lesson.deleteMany({});
  // await db.category.deleteMany({});
  // const category = await db.category.create({
  //   data: {
  //     name: "Test Category",
  //   },
  // });
  // const lesson = await db.lesson.create({
  //   data: {
  //     title: "Lesson 2",
  //     author: "Test Test",
  //     categoryId: category.id,
  //     subLessons: {
  //       create: {
  //         title: "Sub Lesson 1",
  //         audioUrl: "https://www.example.com/audio.mp3",
  //         documentUrl: "https://www.example.com/document.pdf",
  //         pdfUrl: "https://www.example.com/pdf.pdf",
  //       },
  //     },
  //   },
  // });
  // const liveStream = await db.liveStream.create({
  //   data: {
  //     title: "First Live",
  //     date: "Tommorow",
  //     time: "10:00 AM",
  //     location: "Youtube",
  //     streamUrl: "https://www.example.com/stream",
  //   },
  // });
  // const dailyBenifit = await db.dailyBenefit.createMany({
  //   data: [
  //     {
  //       title: "First Daily Benefit",
  //       content: "First Daily Benefit Content",
  //     },
  //     {
  //       title: "Second Daily Benefit",
  //       content: "Second Daily Benefit Content",
  //     },
  //   ],
  // });
  // const blog = await db.blog.create({
  //   data: {
  //     title: "First Blog",
  //     content: "First Blog Content",
  //     author: "Test",
  //   },
  // });
  // const book = await db.book.create({
  //   data: {
  //     title: "First Book",
  //     coverImageUrl: "https://www.example.com/cover.jpg",
  //     downloadUrl: "https://www.example.com/book.pdf",
  //     author: "7amdy",
  //   },
  // });
};
main();
