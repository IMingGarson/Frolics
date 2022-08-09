export function Stemmer(w: string) {
    if (w.length < 3) { 
        return w; 
    }

	const step2list = {
        "ational" : "ate",
        "tional" : "tion",
        "enci" : "ence",
        "anci" : "ance",
        "izer" : "ize",
        "bli" : "ble",
        "alli" : "al",
        "entli" : "ent",
        "eli" : "e",
        "ousli" : "ous",
        "ization" : "ize",
        "ation" : "ate",
        "ator" : "ate",
        "alism" : "al",
        "iveness" : "ive",
        "fulness" : "ful",
        "ousness" : "ous",
        "aliti" : "al",
        "iviti" : "ive",
        "biliti" : "ble",
        "logi" : "log"
    };

    const step3list = {
        "icate" : "ic",
        "ative" : "",
        "alize" : "al",
        "iciti" : "ic",
        "ical" : "ic",
        "ful" : "",
        "ness" : ""
    };

    const c = "[^aeiou]";          // consonant
    const v = "[aeiouy]";          // vowel
    const C = c + "[^aeiouy]*";    // consonant sequence
    const V = v + "[aeiou]*";      // vowel sequence

    const mgr0 = "^(" + C + ")?" + V + C;               // [C]VC... is m>0
    const meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$";  // [C]VC[V] is m=1
    const mgr1 = "^(" + C + ")?" + V + C + V + C;       // [C]VCVC... is m>1
    const s_v = "^(" + C + ")?" + v;                   // vowel in stem

    let stem, suffix, firstch, re, re2, re3, re4;

    firstch = w.substring(0, 1);
    if (firstch == "y") {
        w = firstch.toUpperCase() + w.substring(1);
    }

    // Step 1a
    re = /^(.+?)(ss|i)es$/;
    re2 = /^(.+?)([^s])s$/;

    if (re.test(w)) { 
        w = w.replace(re,"$1$2"); 
    } else if (re2.test(w)) {	
        w = w.replace(re2,"$1$2"); 
    }

    // Step 1b
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;
    if (re.test(w)) {
        let fp = re.exec(w);
        re = new RegExp(mgr0);
        if (fp && re.test(fp[1])) {
            re = /.$/;
            w = w.replace(re, "");
        }
    } else if (re2.test(w)) {
        let fp = re2.exec(w);
        if (fp) {
            stem = fp[1];
            re2 = new RegExp(s_v);
            if (re2.test(stem)) {
                w = stem;
                re2 = /(at|bl|iz)$/;
                re3 = new RegExp("([^aeiouylsz])\\1$");
                re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
                if (re2.test(w)) {	
                    w = w + "e"; 
                } else if (re3.test(w)) { 
                    re = /.$/; w = w.replace(re, "");
                } else if (re4.test(w)) {
                    w = w + "e"; 
                }
            }
        }
    }

    // Step 1c
    re = /^(.+?)y$/;
    if (re.test(w)) {
        let fp = re.exec(w);
        if (fp) {
            stem = fp[1];
            re = new RegExp(s_v);
            if (re.test(stem)) { 
                w = stem + "i";
            }
        }
    }

    // Step 2
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) {
        let fp = re.exec(w);
        if (fp) {
            stem = fp[1];
            suffix = fp[2];
            re = new RegExp(mgr0);
            if (re.test(stem)) {
                w = stem + step2list[suffix as keyof typeof step2list];
            }
        }
    }

    // Step 3
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) {
        let fp = re.exec(w);
        if (fp) {
            stem = fp[1];
            suffix = fp[2];
            re = new RegExp(mgr0);
            if (re.test(stem)) {
                w = stem + step3list[suffix as keyof typeof step3list];
            }
        }
    }

    // Step 4
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) {
        let fp = re.exec(w);
        if (fp) {
            stem = fp[1];
            re = new RegExp(mgr1);
            if (re.test(stem)) {
                w = stem;
            }
        }
    } else if (re2.test(w)) {
        let fp = re2.exec(w);
        if (fp) {
            stem = fp[1] + fp[2];
            re2 = new RegExp(mgr1);
            if (re2.test(stem)) {
                w = stem;
            }
        }
    }

    // Step 5
    re = /^(.+?)e$/;
    if (re.test(w)) {
        let fp = re.exec(w);
        if (fp) {
            stem = fp[1];
            re = new RegExp(mgr1);
            re2 = new RegExp(meq1);
            re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
            if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
                w = stem;
            }
        }
    }

    re = /ll$/;
    re2 = new RegExp(mgr1);
    if (re.test(w) && re2.test(w)) {
        re = /.$/;
        w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
        w = firstch.toLowerCase() + w.substring(1);
    }

    return w;
};