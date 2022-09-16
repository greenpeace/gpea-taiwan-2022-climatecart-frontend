import { useEffect, useMemo } from 'react';
import { useGQL, useGQLWithConnection, gql } from './gqlRequest'
import { useSet } from 'react-use';
import { stringify, parse } from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

// TODO: update to apollo client

export function useArticleList({
    fieldName, selectedCategorySlugs = null, order = 'desc', first = 10
}) {

    const { list, loadNext, hasNextPage, loading } = useGQLWithConnection({
        fieldName: fieldName,
        nodeSubSelection: '{slug, title, main_image, categories { name }}',
        first,
        gqlArguments: (selectedCategorySlugs?.length) ?
            { categories: selectedCategorySlugs, order }:
            { order }
    });

    return { articleList: list, loadNext, hasNextPage, loading }
}

export function useArticleCategoryList( fieldName ) {

    const [ selectedCategoriesSet , { toggle, reset, has }] = useSet(new Set([]));

    const { data } = useGQL(gql`{
        ${fieldName} {
            slug, name
        }
    }`)

    const list = useMemo(() => data?.[`${fieldName}`], [data]);
    const selectedCategorySlugs = useMemo(() => [...selectedCategoriesSet], [selectedCategoriesSet]);

    function handleCategoryClick(category) {
        toggle(category.slug);
    }

    return { categoryList: list, selectedCategorySlugs, handleCategoryClick, resetSelectedCategories: reset, hasSelected: has };
}

export function useArticleDetail( fieldName, slug, hasCategory = false, hasRelated = false ) {
    const { data } = useGQL(gql`{
        ${fieldName} ( slug: "${slug}" ) {
            slug, title, main_image, content, released_at,
            ${ hasCategory ? `categories { slug, name },` : ''}
            ${ hasRelated ? `related_${fieldName} { slug, title, main_image }` : ''}
        }
    }`)

    const article = useMemo(() => {
        const fetchedData = data?.[fieldName];
        if (!fetchedData) return undefined;

        return { ...fetchedData, content: JSON.parse(fetchedData.content || '[]') };
    }, [data]);

    return article;
}

export function useCategoryUrlMapper({ categoryList, selectedCategorySlugs, handleCategoryClick }) {

    const history = useHistory();
    const location = useLocation();
    const categorySlugFromUrl = useMemo(() => parse(location.search)?.categories || [], []);

    useEffect(() => {
        if (!categoryList) return;

        const matchCategory = categoryList.filter(category => categorySlugFromUrl.includes(category.slug));
        matchCategory.forEach( handleCategoryClick );

    }, [categoryList, categorySlugFromUrl]);

    useEffect(() => {

        const newSearch = {
            ...parse(location.search),
            categories: selectedCategorySlugs
        };
        history.replace(location.pathname + '?' + stringify(newSearch));
    }, [selectedCategorySlugs])

}
