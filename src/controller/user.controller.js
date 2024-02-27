import { readFile, writeFile } from "../utils/fs.js";

export default {
  GET: function (req, res) {
    try {
      let books = readFile("books");
      if (!books) {
        throw new Error("Foydalanuvchilar topilmadi");
      }

      if (req.query.name) {
        // name bilan qidirish
        let queryName = req.query.name.toLowerCase();
        books = books.filter((book) =>
          book.name.toLowerCase().startsWith(queryName)
        );
      }

      if (req.query.author && req.query.year) {
        // author va year bilan  search qilish
        let queryAuthor = req.query.author;
        let queryYear = req.query.year;
        books = books.filter(
          (book) => book.author === queryAuthor && book.year == queryYear
        );
      }

      if (req.query.min && req.query.max) {
        // price min max
        let minPrice = req.query.min;
        let maxPrice = req.query.max;
        books = books.filter(
          (book) => book.price >= minPrice && book.price <= maxPrice
        );
      }

      if (req.query.start && req.query.end) {
        // page start end
        let startP = req.query.start;
        let endP = req.query.end;
        books = books.filter(
          (book) => book.page >= startP && book.page <= endP
        );
      }

      if (req.query.author) {
        // author get
        let author = req.query.author;
        books = books.filter((book) => author === book.author);
      }

      if (req.query.price) {
        let price = req.query.price - 0;
        books = books.filter((book) => price === book.price);
      }

      res.send({
        status: 200,
        data: books,
        message: "Success",
      });
    } catch (error) {
      res.end(error.message);
    }
  },
  GETID: function (req, res) {
    // id bilan chaqirib olish
    try {
      let { id } = req.params;
      let books = readFile("books");
      let findbook = books.find((book) => book.id == id);
      if (!findbook) throw new Error("Bunday kitob topilmadi: " + id);

      res.send({
        status: 200,
        data: findbook,
        message: "Success",
      });
    } catch (error) {
      res.end(error.message);
    }
  },
  POST: function (req, res) {
    try {
      let { author, name, price, janr, page, year } = req.body;
      let books = readFile("books");
      const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        author,
        name,
        price,
        janr,
        page,
        year,
      };
      books.push(newBook);
      writeFile("books", books);
      res.status(200).json({
        status: 200,
        data: newBook,
        message: "success",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  PUT: function (req, res) {
    try {   
      let bookId = parseInt(req.params.id);
      let updatedBook = req.body;
      let books = readFile("books")

      let index = books.findIndex((book) => book.id === bookId);

      if (index !== -1) {
        
        books[index] = { ...books[index], ...updatedBook }; 
        writeFile("books", books);

        res.status(200).json({
          status: 200,
          data: books[index],
          message: "Book data yangilandi",
        });
      } else {
        res.status(404).json({ message: "Book yo'q" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  DELETE: function deleteUser(req, res) {
    try {
      let bookId = req.params.bookId;
      let books = readFile("books");

      let index = books.findIndex((book) => book.id === parseInt(bookId));

      let deletedBook = books.splice(index, 1)[0];
      writeFile("books", books);

      res.status(200).json({
        status: 200,
        data: deletedBook,
        message: "User deleted susfuly",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
