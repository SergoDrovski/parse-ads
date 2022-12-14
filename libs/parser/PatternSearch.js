
// { ads_exist: bool, ads_name: String }

exports.patternSearch = function patternSearch() {
    function syncAll(patterns) {
        const node = document.body;
        let res;

        for (let i = 0; i < patterns.length; i++) {
            res = patterns[i](node);
            if(res.ads_exist) break;
        }
        return res;
    }

    function patternLucky(element) {
        const patternsRegex = {
            class: /data-la-show-block-id-[A-Za-z0-9-="]*/gm,
            link: /https:\/\/.*click\?media=/gm,
            attr: /rel="sponsored/gm
        };
        let result = {
            ads_exist: false,
            ads_name: null
        };

        function search(el) {
            const adsElement = [...el.querySelectorAll('div')]
                .reverse()
                .find(el => {
                    for(let type in patternsRegex){
                        if(el.outerHTML.match(patternsRegex[type])) return true
                    }
                    return false
                })
            if(adsElement) {
                result.ads_exist = true;
                result.ads_name = 'Lucky';
            }
            return result;
        }

        return search(element);
    }

    return syncAll([
        patternLucky,

    ])
}