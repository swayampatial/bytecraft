import ProductsContainer from '@/components/products/ProductsContainer';

export default async function ProductsPage({searchParams}: {
    searchParams?: { layout?: string; search?: string };
}) {
    const layout = searchParams?.layout || 'grid';
    const search = searchParams?.search || '';

    return <ProductsContainer layout={layout} search={search}/>;
}
