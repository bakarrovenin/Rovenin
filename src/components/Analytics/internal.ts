/**
 * Internal visits. Landing on any page with ?internal=1 sets this cookie for 400 days (?internal=0 clears
 * it). While it is set, neither Google Analytics nor Leadfeeder loads.
 */
export const INTERNAL_COOKIE = 'rovenin_internal'

/**
 * Inline <head> script, run before any tracker: applies ?internal and records the result on
 * window.__roveninInternal so the trackers can check it.
 */
export const internalVisitScript = `(function(){try{
var n='${INTERNAL_COOKIE}',f=new URLSearchParams(location.search).get('internal'),s=location.protocol==='https:'?'; Secure':'';
if(f==='0'){document.cookie=n+'=; Max-Age=0; Path=/; SameSite=Lax'+s}
else if(f!==null){document.cookie=n+'=1; Max-Age=${400 * 24 * 60 * 60}; Path=/; SameSite=Lax'+s}
window.__roveninInternal=document.cookie.split('; ').some(function(c){return c.indexOf(n+'=')===0});
}catch(e){}})();`
