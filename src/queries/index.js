import { gql } from "@apollo/client";

export const GET_ALL_TOPICS = gql`
    query GetTopics {
        topics {
            data {
                id
                attributes {
                    name
                    short_name
                    banner_image {
                        data {
                            id
                            attributes {
                                url
                            }
                        }
                    }
                    description
                    bundles {
                        data {
                            id
                            attributes {
                                name
                                price
                                products {
                                    data {
                                        id
                                        attributes {
                                            name
                                            short_name
                                            image {
                                                data {
                                                    id
                                                    attributes {
                                                        url
                                                    }
                                                }
                                            }
                                            price
                                            contentHTML
                                            gallery {
                                                id
                                                image {
                                                    data {
                                                        id
                                                        attributes {
                                                            url
                                                        }
                                                    }
                                                }
                                                description
                                            }
                                            ratings {
                                                id
                                                label
                                                rating
                                            }
                                            feedbacks {
                                                id
                                                name
                                                country
                                                country_flag {
                                                    data {
                                                        id
                                                        attributes {
                                                            url
                                                        }
                                                    }
                                                }
                                                content
                                            }
                                            carbon_reduction
                                            topics {
                                                data {
                                                    id
                                                    attributes {
                                                        name
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    products {
                        data {
                            id
                        }
                    }
                }
            }
        }
    }
`;

export const GET_ALL_PRODUCTS = gql`
    query GetAllProducts {
        products(pagination: { pageSize: 100 }) {
            data {
                id
                attributes {
                    name
                    short_name
                    image {
                        data {
                            id
                            attributes {
                                url, formats
                            }
                        }
                    }
                    price
                    contentHTML
                    gallery {
                        id
                        image {
                            data {
                                id
                                attributes {
                                    url
                                }
                            }
                        }
                        description
                    }
                    ratings {
                        id
                        label
                        rating
                    }
                    feedbacks {
                        id
                        name
                        country
                        country_flag {
                            data {
                                id
                                attributes {
                                    url
                                }
                            }
                        }
                        content
                    }
                    carbon_reduction
                    topics {
                        data {
                            id
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const GET_ALL_BUNDLES = gql`
    query GetAllBundles {
        productBundles {
            data {
                id
                attributes {
                    name
                    price
                    products {
                        data {
                            id
                            attributes {
                                name
                                short_name
                                image {
                                    data {
                                        id
                                        attributes {
                                            url
                                        }
                                    }
                                }
                                price
                                contentHTML
                                gallery {
                                    id
                                    image {
                                        data {
                                            id
                                            attributes {
                                                url
                                            }
                                        }
                                    }
                                    description
                                }
                                ratings {
                                    id
                                    label
                                    rating
                                }
                                feedbacks {
                                    id
                                    name
                                    country
                                    country_flag {
                                        data {
                                            id
                                            attributes {
                                                url
                                            }
                                        }
                                    }
                                    content
                                }
                                carbon_reduction
                                topics {
                                    data {
                                        id
                                        attributes {
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const GET_HOMEPAGE_SETTINGS = gql`
    {
        homepageSetting {
            data {
                attributes {
                    display_kol_block
                }
            }
        }
    }
`;

export const GET_KOL_PROMOTES = gql`
    {
        kolPromotes {
            data {
                attributes {
                    name, title, content
                    image { 
                        data { attributes { url } }
                    }
                }
            }
        }
    }
`


export const UPLOAD_WEBSIGN = gql`
    mutation Websign (
        $email: String!
        $firstName: String!
        $lastName: String!
        $address: String!
        $birthYear: Int
        $mobilePhone: String
        $campaignData1: String
        $campaignData2: String
        $campaignData3: String
        $campaignData4: String
        $utmData: UtmData
    ) {
        websign(
            email: $email
            firstName: $firstName
            lastName: $lastName
            address: $address
            birthYear: $birthYear
            mobilePhone: $mobilePhone
            campaignData1: $campaignData1
            campaignData2: $campaignData2
            campaignData3: $campaignData3
            campaignData4: $campaignData4
            utmData: $utmData
        ) { 
            message, mode, key
        }
    }
`

export const SYNC_SHOPPING_RECORD = gql`
    mutation Sync (
        $key: String!, $products: String, $utmData: UtmData
    ) {
        sync(key: $key, products: $products, utmData: $utmData) 
    }
`

export const GET_SHOPPING_RECORD = gql`
    query GetShoppingRecord ($key: String!) {
        shoppingRecordByKey(key: $key) {
            cartItems, email, firstName, lastName, birthYear, mobilePhone, address
        }
    }
`