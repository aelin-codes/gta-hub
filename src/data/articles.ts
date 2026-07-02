export interface Article {
  slug: string
  title: string
  summary: string
  content: string
  published_at: string
  author: string
  image: string
}

export const ARTICLES: Article[] = [
  {
    slug: 'gta-6-leonida-map-leak-analysis',
    title: 'GTA 6 Leonida Map Leak Analysis: Vice City & Beyond',
    summary: 'An in-depth analysis of the Leonida state map leaks, scaling, and comparison with past GTA games.',
    content: `
      <p>The state of Leonida is set to be the biggest map in Rockstar history. Based on the initial trailer and various community mapping projects, the map scale is rumored to be 2.5 times larger than GTA V's San Andreas.</p>
      
      <h2>Key Areas of Leonida</h2>
      <ul>
        <li><strong>Vice City:</strong> The glowing metropolitan neon heart, featuring areas like Vice Beach, Starfish Island, and Downtown.</li>
        <li><strong>Leonida Keys:</strong> A long chain of islands in the south, connected by highways and bridges, perfect for boating and exploration.</li>
        <li><strong>The Grasslands:</strong> Alligator-infested swamplands inspired by the Florida Everglades, rich with wildlife and side missions.</li>
      </ul>
      
      <p>We will keep updating this article as official screenshots and trailers drop from Rockstar Games.</p>
    `,
    published_at: '2026-06-28T12:00:00.000Z',
    author: 'GTA Fan Portal Crew',
    image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=800&auto=format&fit=crop&q=60'
  },
  {
    slug: 'jason-lucia-character-backgrounds-theories',
    title: 'Jason & Lucia: Character Backgrounds & Plot Theories',
    summary: 'What we know about the main protagonists of GTA VI and their Bonnie & Clyde dynamic.',
    content: `
      <p>GTA VI introduces a dual-protagonist system featuring Jason and Lucia. The community is buzzing with theories about their relationship, loyalty missions, and safehouses.</p>
      
      <h2>Lucia: Breaking the Mold</h2>
      <p>Lucia is the first female protagonist in a modern 3D GTA game. The trailer reveals her in a prison jumpsuit, suggesting the story might start after a jailbreak or cover her parole struggles in Vice City.</p>
      
      <h2>Jason: The Quiet Partner</h2>
      <p>Jason seems to be the pragmatic wheelman. The Bonnie & Clyde dynamic suggests that trust between the two players will be a central gameplay mechanic, potentially affecting story endings.</p>
    `,
    published_at: '2026-07-01T15:30:00.000Z',
    author: 'GTA Fan Portal Crew',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60'
  }
]
