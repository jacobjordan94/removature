export const Indeed = {
    
    /**
     * @private
     * @type {Array<HTMLElement>}
     */
    _items: null,
    
    /**
     * @private
     * @type {number}
     */
    _count: 0,

    /**
     * @public
     * @returns {Promise<number>} Number of job listings removed
     */
    removeElems: function() {
        return this._removeElems()
            .then(() => this._clickNonRevatureResult())
            .then(() => this._updateHeader())
            .then(() => this._count);
    },

    /**
     * @private
     * @returns {Promise<number>} Number of job listings removed
     */
    _removeElems: function() {
        return new Promise((resolve) => {
            let interval = setInterval(() => {
                if (document.querySelectorAll(".tapItem, .jobsearch-SerpJobCard").length > 1) {
                    clearInterval(interval);
                    this._items = Array.from(document.querySelectorAll(".tapItem, .jobsearch-SerpJobCard"));
                    for (let i = 0; i < this._items.length; i++) {
                        if(this._getCompanyName(this._items[i]) == "Revature") {
                            this._count++;
                            this._items[i].remove();
                            this._items.splice(i, 1);
                        }
                    }
                    resolve();
                }
            }, 100);
        });
    },

    /**
     * @private
     * @returns {Promise<void>}
     */
    _clickNonRevatureResult: function() {
        for (let i = 0; i < this._items.length; i++) {
            if (this._getCompanyName(this._items[i]) !== "Revature") {
                this._items[i].click();
                break;
            }
        }
        return Promise.resolve();
    },

    /**
     * @private
     * @param {HTMLElement} el 
     * @returns {string | ""} Company name or empty string
     */
    _getCompanyName: function(el) {
        return el.querySelectorAll(".companyName")[0] ? el.querySelectorAll(".companyName")[0].textContent : "";
    },

    /**
     * @private
     * @returns {void}
     */
    _updateHeader: function() {
        let el;
        let text = "Removed " + this._count + " job listings from Revature";
        
        // /jobs page
        if (document.querySelector("#jobsInLocation")) {
            el = document.querySelector("#jobsInLocation").parentElement;
            let h = document.createElement("h1");
            h.textContent = text;
            h.classList.add("currentSearchLabel-a11y-contrast-color");
            h.style = "margin: 0; margin-top: 12px";
            el.appendChild(h);
        } 
        // homepage
        else if (document.querySelectorAll(".jobsearch-RecentSearchesMixedJobFeed-title")[0]) {
            el = document.querySelectorAll(".jobsearch-RecentSearchesMixedJobFeed-title")[0];
            let d = document.createElement("div");
            d.innerText = text;
            d.classList.add("jobsearch-RecentSearchesMixedJobFeed-header");
            el.appendChild(d);
        }
    }
};