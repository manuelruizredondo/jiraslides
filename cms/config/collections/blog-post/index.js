const blogPostsCollection = {
    label: 'Blog',
    name: 'blog',
    folder: 'src/es/blog',
    create: true,
    slug: '{{slug}}',
    fields: [
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Subtitle', name: 'subtitle', widget: 'string' },
        { label: 'Permalink', name: 'permalink', widget: 'string' },
        { label: 'Date', name: 'date', widget: 'datetime' },
        { label: 'Tags', name: 'tags', widget: 'list', default: ['post'] },
        { label: 'Image', name: 'image', widget: 'image' },
        { label: 'Body', name: 'body', widget: 'markdown' },
    ],
};

export default blogPostsCollection;
