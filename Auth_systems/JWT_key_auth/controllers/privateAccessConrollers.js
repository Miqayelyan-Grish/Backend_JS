export const getProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

export const getPosts = async (req, res) => {
  const posts = [
    {
      id: 1,
      title: "First Post",
      content: "Hello from backend",
      type: "photo",
    },
    {
      id: 2,
      title: "Second Post",
      content: "JWT is awesome",
      type: "video",
    },
  ];

  res.status(200).json({
    posts,
  });
};
