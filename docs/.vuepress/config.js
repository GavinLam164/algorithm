module.exports = {
  title: '算法与数据结构',
  description: '讲解常见的算法及数据结构，帮助读者入门算法世界。',
  themeConfig: {
    nav: [
      { text: '基础', link: '/guide/' },
      { text: '树型结构专题', link: '/tree/'},
      { text: '图论专题', link: '/graph/'},
      { text: '字符串专题', link: '/string/'},
      {
        text: '动态规划专题', link: '/dp/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: '复杂度',
          children: [
            'complexity'
          ],
        },
        {
          title: '排序算法',
          children: [
            'bubble',
            'select',
            'insertion',
            'bucket',
            'radix',
            'merge',
            'quick',
            'heap'
          ]
        },
        {
          title: '基础数据结构',
          children: [
            'array',
            'link',
            'queue',
            'stack',
            'hashmap'
          ]
        },
      ],
      '/tree/': [
        {
          title: '树形结构专题',
          children: [
            'traverse',
            'recursion',
            'morris',
            'tree'
          ]
        },
      ],
      '/graph/': [
        {
          title: '图论基础',
          children: [
            ''
          ]
        },
        {
          title: '图论算法',
          children: [
            'topology',
            'disjoinset',
            'kruskal',
            'prim',
            'astar'
          ]
        },
        {
          title: '搜索算法',
          children: [
            'bfs',
            'dfs',
            'astar'
          ]
        },
      ],
      '/string/': [
        {
          title: '字符串专题',
          children: [
            '',
            'trie',
            'kmp',
            'manacher',
            'rabin',
            'segment'
          ]
        },
      ],
      '/dp/': [
        {
          title: '动态规划专题',
          children: [
            '',
            'recursion',
            'memo',
            'dpbasic'
          ]
        }
      ]
    }
  }
}