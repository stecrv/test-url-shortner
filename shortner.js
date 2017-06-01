var shortner = {
    /**
     * list of object with URL and short URL
     */
    data: [],
    /**
     * Create an object {short_url: VAL, url: VAL } to add to list of shortner
     * @param url could be a simple string containg an URL or a JSON  {'url':value}, like { "url": "http://www.farmdrop.com" }
     * @returns {boolean} added to list of URL
     */
    addURL: function (url) {
        console.log('addURL', url);
        if (!url) return false;
        var el = {short_url: this.createShortUrl(), url: null};
        var urlObject = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
            url.replace(/"(\\.|[^"\\])*"/g, ''))) &&
            eval('(' + url + ')');
        el.url = urlObject ? urlObject.url : url;
        this.data.push(el);
    },
    /**
     * get the full URL for a given short URL
     * @param key is a short URL
     * @returns {*}
     */
    getURL: function (key) {
        for (var el in this.data) {
            if (el.short_url == key) {
                return el.url;
            }
        }
        return false
    },
    /**
     * create a random hort url
     * @returns {string}
     */
    createShortUrl: function () {
        return '/' + (Math.random() + 1).toString(36).substring(6, 12);
    }
};

module.exports = shortner;