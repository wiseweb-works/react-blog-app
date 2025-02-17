function stripTags(content: string): string {
  return content.replace(/<[^>]*>/g, '');
}

export default stripTags;
