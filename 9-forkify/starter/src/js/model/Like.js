

export default class Like {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);


        // Persist data in localStorage
        this.persistDate();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist data in localStorage
        this.persistDate();

    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    // Presist
    persistDate() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes')); // if not, return null
        
        // Restore likes from localStorage
        if (storage) this.likes = storage;
    }
}