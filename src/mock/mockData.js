export const mockPosts = [
    {
        id: "1",
        title: "What is your favorite programming language?",
        content: "I'm curious to know what language people prefer and why!",
        media: "/mock_images/Frustrated Customer Service GIF.gif",
        author: {
            username: "user123",
            avatar: "/mock_images/default-avatar.jpg"
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
            avatar: "/mock_images/default-avatar.jpg"
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
        media: "/mock_images/python.png",
        author: {
            username: "python_guru",
            avatar: "/mock_images/default-avatar.jpg"
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
            avatar: "/mock_images/default-avatar.jpg"
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
            avatar: "/mock_images/default-avatar.jpg"
        },
        content: "JavaScript is amazing for full-stack development!",
        upvotes: 20,
        createdAt: "2025-03-19T14:00:00Z",
    },
  ];

  export const mockSubreddit = [
    {
        id: "1",
        icon: "/mock_images/default-avatar.jpg",
        name: "programming",
        members: 120000,
    },
    {
        id: "2",
        icon: "/mock_images/default-avatar.jpg",
        name: "webdev",
        members: 90000,
    },
    {
        id: "3",
        icon: "/mock_images/default-avatar.jpg",
        name: "learnprogramming",
        members: 250000,
    },
    {
        id: "4",
        icon: "/mock_images/default-avatar.jpg",
        name: "javascript",
        members: 175000,
    },
    {
        id: "5",
        icon: "/mock_images/default-avatar.jpg",
        name: "coding",
        members: 2750000,
    },
  ];