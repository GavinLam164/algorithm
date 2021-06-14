module.exports = {
  title: '算法与数据结构',
  description: '讲解常见的算法及数据结构，帮助读者入门算法世界。',
  themeConfig: {
    nav: [
      { text: '基础', link: '/guide/' },
      { text: '树型结构专题', link: '/tree/' },
      { text: '图论专题', link: '/graph/'},
      { text: '字符串专题', link: '/string/' },
      {
        text: '位运算', link: '/bit/'
      },
      {
        text: '动态规划专题', link: '/dp/'
      },
      {
        text: 'GitHub', link: 'https://github.com/GavinLam164/algorithm', target:'_blank'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: '复杂度',
          children: [
            '',
            'type',
            'complexity',
            'master',
            'archived'
          ],
        },
        {
          title: '排序算法',
          children: [
            'intro',
            'bubble',
            'select',
            'insertion',
            'bucket',
            'radix',
            'merge',
            'quick',
            'heap',
            'sort-archived'
          ]
        },
        {
          title: '基础数据结构',
          children: [
            'struct',
            'array',
            'link',
            'queue',
            'stack',
            'hashmap',
            'struct-archived'
          ]
        },
      ],
      '/tree/': [
        {
          title: '树形结构专题',
          children: [
            '',
            'recursion',
            'traverse',
            'morris',
            'list'
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
            'prim'
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
      '/bit/': [
        {
          title: '位运算',
          children: [
            '',
            'operator'
          ]
        }
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