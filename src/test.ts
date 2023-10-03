import { db } from "./db.js";

const main = async () => {
  const author = await db.author.create({
    data: {
      name: "Hossam Mohsen",
    },
  });

  const category = await db.category.create({
    data: {
      name: "Test Category",
    },
  });

  const lesson = await db.lesson.create({
    data: {
      title: "Lesson 1",
      authorId: author.id,
      categoryId: category.id,
      audioUrl: "https://www.example.com/audio.mp3",
      documentUrl: "https://www.example.com/document.pdf",
      pdfUrl: "https://www.example.com/pdf.pdf",
    },
  });

  const liveStream = await db.liveStream.create({
    data: {
      title: "First Live",
      date: "Tommorow",
      time: "10:00 AM",
      location: "Youtube",
      streamUrl: "https://www.example.com/stream",
    },
  });

  const dailyBenifit = await db.dailyBenefit.createMany({
    data: [
      {
        title: "First Daily Benefit",
        content: "First Daily Benefit Content",
      },
      {
        title: "Second Daily Benefit",
        content: "Second Daily Benefit Content",
      },
    ],
  });

  const blog = await db.blog.create({
    data: {
      title: "First Blog",
      content: "First Blog Content",
      authorId: author.id,
    },
  });

  const book = await db.book.create({
    data: {
      title: "First Book",
      coverImageUrl: "https://www.example.com/cover.jpg",
      downloadUrl: "https://www.example.com/book.pdf",
    },
  });
};
main();
