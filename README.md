# ru.index.community

## Как добавить инстанс

Создайте файл в папке `src/data/instances/<URI инстанса>.json` и заполните его согласно схеме `src/data/schemas/instances.json`

Пример файла:
```json
{
    "$schema": "../schemas/instances.json",
    "uri": "sect.sunbutt.faith",
    "title": "Celestianism Sect",
    "short_description": "Уютное русскоязычное место в глобальной сети Fediverse для свободного и дружелюбного общения имени Её Величия и Размера — принцессы Селестии.",
    "thumbnail": "sect.sunbutt.faith.png",
    "software": {
        "name": "pleroma",
        "version": "2.2.0-0-gfb0e340-release-2-2-0",
        "repository": "https://git.pleroma.social/pleroma/pleroma"
    },
    "users": {
        "total": 36
    },
    "administration": {
        "backups_policy": "daily",
        "bus_factor": 4,
        "contact_email": "commagray@sunbutt.faith",
        "server_location": 804 # Country code
    },
    "registration": {
        "approval_required": false,
        "available": true,
        "email_required": true,
        "invite_required": false
    },
    "posting": {
        "max_chars": 5000,
        "poll_settings": {
            "max_option_chars": 200,
            "max_options": 20,
            "max_expiration": 31536000,
            "min_expiration": 0
        },
        "post_formats": [
            "text/plain",
            "text/html",
            "text/markdown",
            "text/bbcode"
        ],
        "upload_limits": {
            "avatar": 2000000,
            "background": 4000000,
            "banner": 4000000,
            "general": 16000000
        }
    }
}
```
Минимально заполненный файл:
```json
{
    "$schema": "../schemas/instances.json",
    "uri": "ru.social",
    "short_description": "Региональный Российский узел сети Fediverse.",
    "thumbnail": "ru.social.png",
    "software": {
        "name": "mastodon",
        "version": "3.3.0"
    },
    "users": {
        "total": 149
    },
    "posting": {
        "max_chars": 500,
        "poll_settings": {
            "max_option_chars": 25,
            "max_options": 4
        },
        "post_formats": [
            "text/plain"
        ]
    },
    "administration": {
        "provider": "Selectel",
        "cloudflare": false
    }
}
```

Баннеры не обязательны, и должны быть размещены в `src/images/instance.tld.png`.

## Как добавить группу
Создайте файл в папке `src/data/groups/<handle>@<instance>.json` и заполните его согласно схеме `src/data/schemas/groups.json`
Пример файла:
```json
{
    "$schema": "../schemas/groups.json",
    "uri": "mastodon.ml/@rf",
    "handle": "@rf@mastodon.ml",
    "title": "Rоссийская🐻Fедерация",
    "short_description": "Объединение русскоязычных пользователей Федиверса, самая популярная группа общей тематики",
    "members": 1155,
    "icon": "rf@mastodon.ml.icon.png",
    "thumbnail": "rf@mastodon.ml.banner.png"
}
```

Аватарки и баннеры не обязательны, и должны быть размещены в `src/images/handle@instance.tld.icon.png` и `src/images/handle@instance.tld.banner.png` соответственно.

## Как работать

```sh
npm install
npm run develop
npm run build
```

### Обновить данные по инстансам

```sh
node fetchData.js
```
