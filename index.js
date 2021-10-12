module.exports = function lfgfilter(mod) {
    const lfgbl = [
        /wts/i, /wtb/i, /lfm/i, /twitch/i, /kaufe/i, //advertisements
        /[\u0410-\u044f]/u, //cyrillic
        /afk/i, /^.{1}$/, /owo/i, /uwu/i, /shore/i, /friend/i, /gu?ild/i //spam
    ]
    mod.hook('S_SHOW_PARTY_MATCH_INFO', 2, event => {
        //console.log(event)
        let cleaned = []
        for (let listing of event.listings) {
            let found = false
            if (listing.leaderName == mod.game.me.name) {
                cleaned.push(listing)
                continue
            }
            for (let rx of lfgbl) {
                if (rx.test(listing.message)) {
                    found = true
                    break
                }
            }
            if (found) continue
            cleaned.push(listing)
        }
        event.listings = cleaned
        return true
    })
}