/** 人物父子关系示例数据（基于第一章涉及人物） */
export const characterTreeData = {
  id: 'root',
  label: '大明皇室',
  children: [
    {
      id: 'shenzong',
      label: '神宗显皇帝',
      children: [
        {
          id: 'guangzong',
          label: '光宗贞皇帝',
          children: [
            {
              id: 'xizong',
              label: '熹宗悊皇帝',
            },
          ],
        },
        {
          id: 'wang-guifei',
          label: '王恭妃（皇贵妃）',
        },
      ],
    },
    {
      id: 'cishou',
      label: '慈圣皇太后',
    },
    {
      id: 'wang-xuanshi',
      label: '王选侍（孝和皇太后）',
      children: [
        {
          id: 'xizong-mother',
          label: '熹宗生母',
        },
      ],
    },
    {
      id: 'li-xuanshi',
      label: '先帝选侍李氏',
    },
  ],
}
