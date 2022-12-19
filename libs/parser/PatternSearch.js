exports.patternSearch = function patternSearch() {

    // Поочерёдный Запуск проверки на каждого партнёра
    function syncAll(patterns) {
        const node = document.body.outerHTML;
        let res;

        for (let i = 0; i < patterns.length; i++) {
            res = search(patterns[i], node);
            if (res.ads_exist) break;
        }
        return res;
    }

    // Общая функция проверки, получаем регулярку и элемен по которому ищем
    function search(patterns, element) {

        let result = {
            ads_exist: false,
            ads_name: null,
            pattern_find: null
        };

        // Поск делаю по outerHTML всего body(проходимся по строке регуляркой)
        for (let type in patterns.regex) {
            let r = element.match(patterns.regex[type]);
            if (r) {
                result.pattern_find = type + ": " + patterns.regex[type];
                result.ads_exist = true;
                result.ads_name = patterns.ads_name;
                break
            }
        }

        return result;
    }


    // Правила проверки партнёров (регулярки)
    const Lucky = {
        ads_name: 'Lucky',
        regex: {
            class: /data-la-show-block-id-[A-Za-z0-9-="]*/gm,
            link: /https:\/\/.*click\?media=/gm,
            attr: /rel="sponsored/gm
        }
    };

    const Adwail = {
        ads_name: 'Adwail',
        regex: {
            link: /adwile.com/gm,
            class: /smi24__informer/gm,
            attr: /data-smi-blockid/gm
        }
    };

    const Directadvert = {
        ads_name: 'Directadvert',
        regex: {
            link: /code.directadvert.ru/gm,
            class: /directadvert-block/gm,
        }
    };


    // Запуск проверки
    return syncAll([
        Lucky,
        Adwail,
        Directadvert
    ])
}