/**
* Send the tracking event to the ga
* @param  {string} eventLabel The ga trakcing name, normally it will be the short campaign name. ex 2019-plastic_retailer
* @param  {[type]} eventValue Could be empty
* @return {[type]}            [description]
*/
export function sendPetitionTracking(eventAction, contentCategory) {

    const eventLabel = '2022-climatecart';

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
        'event': 'gaEvent',
        'eventCategory': 'petitions',
        'eventAction': eventAction,
        'eventLabel': eventLabel,
        'eventValue': undefined
    });

    window.dataLayer.push({
        'event': 'fbqEvent',
        'contentName': eventLabel,
        'contentCategory': contentCategory
    });

    window.uetq = window.uetq || [];
    window.uetq.push('event', 'signup', { 'event_category': 'petitions', 'event_label': eventLabel, 'event_value': 0 });
}

export function sendToFbq(category_name, content_name) {
    window.fbq?.(
        'track',
        category_name,
        {
            content_name: content_name,
            content_ids: ['1234'],
            content_type: 'product',
            value: 1,
            currency: 'USD'
        }
    );
}