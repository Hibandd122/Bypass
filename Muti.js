(function() {
    'use strict';

    if (window.location.href.match(/^https:\/\/ez4short\.com\/.*/)) {
        if (window.location.href.match(/^https:\/\/ez4short\.com\/.*/)) {
            const formData = new FormData();
            formData.append('_method', 'POST');
            formData.append('_csrfToken', document.querySelector('input[name="_csrfToken"]').value);
            formData.append('ad_form_data', document.querySelector('input[name="ad_form_data"]').value);
            formData.append('_Token[fields]', document.querySelector('input[name="_Token[fields]"]').value);
            formData.append('_Token[unlocked]', document.querySelector('input[name="_Token[unlocked]"]').value);

            const headers = {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest'
            };

            fetch('https://ez4short.com/links/go', {
                method: 'POST',
                headers: headers,
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success' && data.url) {
                    window.location.replace(data.url);
                }
            })
            .catch(error => {});
        }
    }

    if (window.location.href.match(/^https:\/\/layma\.net\/.*/)) {
        const tokenId = document.getElementById("tokenId")?.innerText || "";
        const campainId = document.getElementById("campainId")?.innerText || "";

        async function getCodeAndCheck(campainId, tokenId) {
            const getCodeUrl = "https://api.layma.net/api/admin/codemanager/getcode";
            const checkCodeUrl = "https://api.layma.net/api/admin/codemanager/checkcode";

            const requestData = {
                browser: "Chrome",
                browserVersion: "133.0.0.0",
                browserMajorVersion: 133,
                cookies: true,
                mobile: false,
                os: "Windows",
                osVersion: "10",
                screen: "1920 x 1080",
                referrer: "https://www.google.com/",
                trafficid: campainId,
                solution: "0"
            };

            try {
                const response = await fetch(getCodeUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestData)
                });

                const data = await response.json();

                const checkData = {
                    Code: data.html,
                    Token: tokenId,
                    CampainId: campainId,
                    UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
                    DeviceScreen: "1920 x 1080"
                };

                const checkResponse = await fetch(checkCodeUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(checkData)
                });

                window.location.href = await checkResponse.text();

            } catch (error) {}
        }

        getCodeAndCheck(campainId, tokenId);
    }

    if (window.location.href.match(/^https:\/\/linkunlocker\.com\/.*/)) {
        (async function() {
            try {
                const scripts = document.querySelectorAll("script");
                const foundScript = Array.from(scripts).find(script => script.textContent.includes("_secureTarget"));

                if (!foundScript) {
                    throw new Error("❌ Không tìm thấy dữ liệu trong script");
                }

                const cleaned = foundScript.textContent
                    .replace(/\\"/g, '"')
                    .replace(/\\n/g, '')
                    .replace(/\\'/g, "'");

                const secureTarget = cleaned.match(/"_secureTarget"\s*:\s*"([^"]+)"/)?.[1] || null;
                const id = cleaned.match(/"_id"\s*:\s*"([a-f0-9]{24})"/)?.[1] || null;

                if (!id || !secureTarget) {
                    throw new Error("❌ Không trích xuất được id hoặc secureTarget");
                }

                const tokenRes = await fetch('https://linkunlocker.com/api/generate-token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ unlockerId: id })
                });
                if (!tokenRes.ok) throw new Error('Failed to get token');
                const { token } = await tokenRes.json();

                const urlRes = await fetch('https://linkunlocker.com/api/decrypt-url', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        encryptedUrl: secureTarget,
                        requestToken: token,
                        unlockerId: id,
                        useAdDestination: false,
                        adDestination: ''
                    })
                });
                if (!urlRes.ok) throw new Error('Failed to decrypt URL');
                const { url } = await urlRes.json();

                window.location.href = url;
            } catch (error) {}
        })();
    }

    if (window.location.href.match(/^https:\/\/linkvertise\.com\/.*/)) {
        (async () => {
            const isLongUrl = () => /https:\/\/linkvertise\.com\/\d+\/\d+\/\d+\/dynamic\?r=[a-zA-Z0-9%=_-]+&o=sharing/.test(location.href);

            const waitEl = (sel, t = 1e4) => new Promise((r, j) => {
                let e = 0;
                const i = setInterval(() => {
                    const el = document.querySelector(sel);
                    if (el) { clearInterval(i); r(el); }
                    else if (e >= t) { clearInterval(i); j(`Timeout: ${sel}`); }
                    e += 100;
                }, 100);
            });

            const bypass = async () => {
                const u = 'https://publisher.linkvertise.com/graphql';
                const p = location.href.split('/');
                const id = p[3];
                let l = p[4].split('?')[0];
                const h = {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3B1Ymxpc2hlci5saW5rdmVydGlzZS5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3MzkzMzM2NzUsIm5iZiI6MTczOTMzMzY3NSwianRpIjoiSVlJZFlCMzJlMlNqZFE5YiIsInN1YiI6Mzc5MjUwMiwicHJ2IjoiN2IzZmVmNDNmOTgxZTE3Nzc5MGQwMGJkZjQ1M2ZhZGM3NzNmNzI4YyJ9.rinBWBjTpB1FGvaBpPchzyfDIx43t2iHfvZTKxsbPSs',
                    'Content-Type': 'application/json',
                    'Origin': 'https://linkvertise.com',
                    'Referer': 'https://linkvertise.com/',
                    'User-Agent': navigator.userAgent
                };

                try {
                    const b1 = JSON.stringify({
                        operationName: "getDetailPageContent",
                        variables: { linkIdentificationInput: { userIdAndUrl: { user_id: id, url: l } }, origin: "sharing", additional_data: { taboola: { external_referrer: "", user_id: "fallbackUserId", url: location.href, test_group: "old", session_id: null } } },
                        query: `mutation getDetailPageContent($linkIdentificationInput: PublicLinkIdentificationInput!, $origin: String, $additional_data: CustomAdOfferProviderAdditionalData!) { getDetailPageContent(linkIdentificationInput: $linkIdentificationInput origin: $origin additional_data: $additional_data) { access_token __typename } }`
                    });

                    const r1 = await fetch(u, { method: 'POST', headers: h, body: b1 });
                    if (!r1.ok) throw new Error(`HTTP ${r1.status}`);
                    const d1 = await r1.json();
                    const t = d1?.data?.getDetailPageContent?.access_token;
                    if (!t) { alt(); return; }

                    const b2 = JSON.stringify({
                        operationName: "completeDetailPageContent",
                        variables: { linkIdentificationInput: { userIdAndUrl: { user_id: id, url: l } }, completeDetailPageContentInput: { access_token: t } },
                        query: `mutation completeDetailPageContent($linkIdentificationInput: PublicLinkIdentificationInput!, $completeDetailPageContentInput: CompleteDetailPageContentInput!) { completeDetailPageContent(linkIdentificationInput: $linkIdentificationInput completeDetailPageContentInput: $completeDetailPageContentInput) { CUSTOM_AD_STEP TARGET additional_target_access_information { remaining_waiting_time can_not_access should_show_ads has_long_paywall_duration __typename } __typename } }`
                    });

                    const r2 = await fetch(u, { method: 'POST', headers: h, body: b2 });
                    if (!r2.ok) throw new Error(`HTTP ${r2.status}`);
                    const d2 = await r2.json();
                    const v = d2?.data?.completeDetailPageContent?.TARGET;

                    const b3 = JSON.stringify({
                        operationName: "getDetailPageTarget",
                        variables: { linkIdentificationInput: { userIdAndUrl: { user_id: id, url: l } }, token: v },
                        query: `mutation getDetailPageTarget($linkIdentificationInput: PublicLinkIdentificationInput!, $token: String!) { getDetailPageTarget(linkIdentificationInput: $linkIdentificationInput token: $token) { type url paste short_link_title __typename } }`
                    });

                    const r3 = await fetch(u, { method: 'POST', headers: h, body: b3 });
                    if (!r3.ok) throw new Error(`HTTP ${r3.status}`);
                    const d3 = await r3.json();
                    const ty = d3?.data?.getDetailPageTarget?.type;
                    const ur = d3?.data?.getDetailPageTarget?.url;
                    const pa = d3?.data?.getDetailPageTarget?.paste;

                    if (ty === "URL" && ur) location.href = ur;
                    else if (ty === "PASTE" && pa) show(pa);
                } catch (e) {}
            };

            const show = (c) => {
                const d = document.createElement('div');
                Object.assign(d.style, { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', border: '1px solid #ccc', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', zIndex: '9999' });
                d.innerHTML = `<h3 style="margin-bottom: 10px;">PASTE Content</h3><pre style="white-space: pre-wrap; word-wrap: break-word;">${c}</pre>`;

                document.body.appendChild(d);

                const cl = document.createElement('button');
                cl.innerText = 'Đóng';
                cl.style.marginTop = '10px';
                cl.onclick = () => d.remove();
                d.appendChild(cl);

                const cp = document.createElement('button');
                cp.innerText = 'Sao chép';
                cp.style.margin = '10px 0 0 10px';
                cp.onclick = () => {
                    const t = document.createElement('textarea');
                    t.value = c;
                    document.body.appendChild(t);
                    t.select();
                    document.execCommand('copy');
                    document.body.removeChild(t);
                    alert('Đã sao chép!');
                };
                d.appendChild(cp);
            };

            const alt = () => {
                (async () => {
                    if (/[?&]r=/.test(location.href)) {
                        const r = new URLSearchParams(location.search).get('r');
                        location.href = atob(decodeURIComponent(r));
                    }
                })();
            };

            if (isLongUrl()) alt();
            else {
                try {
                    await waitEl('.action-box__content-table__rating-wrapper');
                    await bypass();
                } catch (e) {}
            }
        })();
    }

    if (window.location.href.match(/^https:\/\/mneylink\.com\/.*/)) {
        const fetchUrl = 'https://mneylink.com/load_traffic?&r=https://www.google.com/&t=60&w=https://www.google.com/';

        GM_xmlhttpRequest({
            method: 'GET',
            url: fetchUrl,
            onload: function(response) {
                try {
                    const jsonResponse = JSON.parse(response.responseText);
                    if (jsonResponse.status === 1 && jsonResponse.data.html) {
                        const code = jsonResponse.data.html;

                        if (window.location.href.startsWith('https://mneylink.com/')) {
                            const codeInput = document.querySelector('input#code');
                            const submitButton = document.querySelector('button#invisibleCaptchaShortlink');

                            if (codeInput && submitButton) {
                                codeInput.value = code;
                                submitButton.click();
                            }
                        }
                    }
                } catch (e) {}
            },
            onerror: function(error) {}
        });
    }

    if (window.location.href.match(/^https:\/\/rekonise\.com\/.*/)) {
        const currentUrl = window.location.href;
        const regex = /https:\/\/rekonise\.com\/(.+)/;
        const match = currentUrl.match(regex);

        if (match && match[1]) {
            const slug = match[1];
            const apiUrl = `https://api.rekonise.com/social-unlocks/${slug}/unlock`;

            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.url) {
                        const redirectUrl = data.url;
                        window.location.replace(redirectUrl);
                    }
                })
                .catch(error => {});
        }
    }

    if (window.location.href.match(/^https:\/\/www\.animalspub\.com\/.*/) || window.location.href.match(/^https:\/\/sub4unlock\.io\/.*/)) {
        const unlockButton = document.querySelector('a.get-link.buttonpanel.buttonpanel-block.btn-lg');

        if (unlockButton) {
            const newUrl = unlockButton.getAttribute('href');

            if (newUrl && newUrl.startsWith('http')) {
                window.location.replace(newUrl);
            }
        }
    }

    if (window.location.href.match(/^https:\/\/traffic24h\.net\/.*/)) {
        setTimeout(() => {
            let d = { href: '', hostname: '', user_agent: navigator.userAgent };
            for (let s of document.scripts) {
                let m = s.textContent.match(/website:\s*"([^"]+)"/);
                if (m) { d.href = m[1]; d.hostname = new URL(m[1]).hostname; break; }
            }
            if (!d.href) return;
            let link = location.pathname.split('/').pop();
            fetch('https://demo24h.wiki/Ping/Get', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d)
            })
            .then(r => r.json())
            .then(({ code }) => fetch('https://traffic24h.net/assets/ajaxs/Authbk.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ type: 'Checkcodez', website: d.href, code, link })
            }))
            .then(r => r.text())
            .then(t => {
                let m = t.match(/\$ ?\("#redirect"\)\.val\("([^"]+)"\)/);
                if (m) location.href = m[1];
            });
        }, 500);
    }
})();
