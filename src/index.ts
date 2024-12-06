import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

type Book = {
    id: string;
    title: string;
    author: string;
    publishedYear: number;
};

// In-memory storage (reset on every invocation)
const books: Record<string, Book> = {};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { httpMethod: method, path, body } = event;
    const parsedBody = body ? JSON.parse(body) : null;

    try {
        if (method === 'POST' && path === '/books') {
            const newBook: Book = { id: Date.now().toString(), ...parsedBody };
            books[newBook.id] = newBook;

            return {
                statusCode: 201,
                body: JSON.stringify(newBook),
            };
        }

        if (method === 'GET' && path.startsWith('/books')) {
            const bookId = path.split('/books/')[1];

            if (bookId) {
                const book = books[bookId];
                if (!book) {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({ message: 'Book not found' }),
                    };
                }
                return {
                    statusCode: 200,
                    body: JSON.stringify(book),
                };
            }

            // Return all books
            return {
                statusCode: 200,
                body: JSON.stringify(Object.values(books)),
            };
        }

        if (method === 'PUT' && path.startsWith('/books/')) {
            const bookId = path.split('/books/')[1];
            if (books[bookId]) {
                const updatedBook = { ...books[bookId], ...parsedBody };
                books[bookId] = updatedBook;

                return {
                    statusCode: 200,
                    body: JSON.stringify(updatedBook),
                };
            }
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Book not found' }),
            };
        }

        if (method === 'DELETE' && path.startsWith('/books/')) {
            const bookId = path.split('/books/')[1];
            if (books[bookId]) {
                delete books[bookId];
                return {
                    statusCode: 204,
                    body: '',
                };
            }
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Book not found' }),
            };
        }

        return {
            statusCode: 405,
            body: JSON.stringify({ message: `Method ${method} not allowed` }),
        };
    } catch (error) {
        console.error('Error handling request:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
