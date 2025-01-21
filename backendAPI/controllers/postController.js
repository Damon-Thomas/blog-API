const getPosts = (req, res) => {
    console.log('getPosts');
    res.json({
        message: 'access approved'
    });
    }

export default {
    getPosts,
}