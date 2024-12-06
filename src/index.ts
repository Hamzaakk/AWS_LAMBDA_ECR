import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

type Book = {
    id: string;
    title: string;
    author: string;
    publishedYear: number;
};

const books: Record<string, Book> = {};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const method = event.httpMethod;
    const path = event.path;
    const body = event.body ? JSON.parse(event.body) : null;

    switch (method) {
        case 'POST': // Create
            if (path === '/books') {
                const newBook: Book = { id: Date.now().toString(), ...body };
                books[newBook.id] = newBook;

                return {
                    statusCode: 201,
                    body: JSON.stringify(newBook),
                };
            }
            break;

        case 'GET': // Read
            if (path.startsWith('/books')) {
                const bookId = path.split('/books/')[1];
                if (bookId) {
                    const book = books[bookId];
                    if (!book) {
                        return {
                            statusCode: 404,
                            body: JSON.stringify({ message: 'Books  not availibale' }),
                        };
                    }
                    return {
                        statusCode: 200,
                        body: JSON.stringify(book),
                    };
                } else {
                    // Return all books
                    return {
                        statusCode: 200,
                        body: JSON.stringify(Object.values(books)),
                    };
                }
            }
            break;

        case 'PUT': // Update
            if (path.startsWith('/books/')) {
                const bookId = path.split('/books/')[1];
                if (books[bookId]) {
                    const updatedBook = { ...books[bookId], ...body };
                    books[bookId] = updatedBook;

                    return {
                        statusCode: 200,
                        body: JSON.stringify(updatedBook),
                    };
                } else {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({ message: 'Book not created' }),
                    };
                }
            }
            break;

        case 'DELETE': // Delete
            if (path.startsWith('/books/')) {
                const bookId = path.split('/books/')[1];
                if (books[bookId]) {
                    delete books[bookId];
                    return {
                        statusCode: 204,
                        body: JSON.stringify({}),
                    };
                } else {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({ message: 'Book not found' }),
                    };
                }
            }
            break;

        default:
            return {
                statusCode: 405,
                body: JSON.stringify({ message: `Method ${method} not allowed` }),
            };
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Invalid request' }),
    };
};
