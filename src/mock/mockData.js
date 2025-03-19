export const mockPosts = [
    {
        id: "1",
        title: "What is your favorite programming language?",
        content: "I'm curious to know what language people prefer and why!",
        media: "../assets/mock_images/Frustrated Customer Service GIF.gif",
        author: {
            username: "user123",
            avatar: "../assets/mock_images/default_avatar.jpg"
        },
        subreddit: "programming",
        upvotes: 120,
        comments: 2,
        createdAt: "2025-03-19T12:00:00Z",
    },
    {
        id: "2",
        title: "React vs Vue vs Angular",
        content: "Which one do you think is better for modern web development?",
        author: {
            username: "dev_guru",
            avatar: "../assets/mock_images/default_avatar.jpg"
        },
        subreddit: "webdev",
        upvotes: 95,
        comments: 0,
        createdAt: "2025-03-18T15:30:00Z",
    },
    {
        id: "3",
        title: "How to learn Python?",
        content: "I'm looking to learn Python. Any tips?",
        media: "../assets/mock_images/python.png",
        author: {
            username: "python_guru",
            avatar: "../assets/mock_images/default_avatar.jpg"
        },
        subreddit: "learnprogramming",
        upvotes: 70,
        comments: 0,
        createdAt: "2025-03-18T10:00:00Z",
    }
  ];
  
  export const mockComments = [
    {
        id: "c1",
        postId: "1",
        author: {
            username: "coder99",
            avatar: "../assets/mock_images/default_avatar.jpg"
        },
        content: "I love Python because of its simplicity and versatility.",
        upvotes: 15,
        createdAt: "2025-03-19T13:00:00Z",
    },
    {
        id: "c2",
        postId: "1",
        author: {
            username: "js_fan",
            avatar: "../assets/mock_images/default_avatar.jpg"
        },
        content: "JavaScript is amazing for full-stack development!",
        upvotes: 20,
        createdAt: "2025-03-19T14:00:00Z",
    },
  ];
  