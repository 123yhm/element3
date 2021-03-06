import { mount, flushPromises } from '@vue/test-utils'
import Rate from '../src/Rate.vue'

describe('Rate', () => {
  it('should  show five unselected star icon', () => {
    const wrapper = mount(Rate)

    const unselectedItems = wrapper.findAll('.el-rate__item .el-icon-star-off')

    expect(unselectedItems.length).toBe(5)
  })

  it('should show four item when set prop max equal to four', () => {
    const wrapper = mount(Rate, {
      props: {
        max: 4
      }
    })

    const unselectedItems = wrapper.findAll('.el-rate__item .el-icon-star-off')

    expect(unselectedItems.length).toBe(4)
  })

  // todo 再次click 之后会刷新所有的 star
  it('点击当前 icon 的时候，当前 icon 包括之前的 icon 都切换到选中状态', async () => {
    const wrapper = mount(Rate)

    //"" click third icon
    const thirdItem = wrapper.findAll('.el-rate__item')[2]
    thirdItem.trigger('click')

    await flushPromises()
    const items = wrapper.findAll('.el-rate__item')
    expect(items[0].get('i').classes('el-icon-star-on')).toBe(true)
    expect(items[1].get('i').classes('el-icon-star-on')).toBe(true)
    expect(items[2].get('i').classes('el-icon-star-on')).toBe(true)
    expect(items[3].get('i').classes('el-icon-star-off')).toBe(true)
    expect(items[4].get('i').classes('el-icon-star-off')).toBe(true)
  })

  it('鼠标悬浮到第四个 icon 的时候,前三个 icon 应该是选中状态', async () => {
    const wrapper = mount(Rate)

    const fourthItem = wrapper.findAll('.el-rate__item')[3]
    fourthItem.trigger('mouseover')

    await flushPromises()
    const items = wrapper.findAll('.el-rate__item')
    expect(items[0].get('i').classes('el-icon-star-on')).toBe(true)
    expect(items[1].get('i').classes('el-icon-star-on')).toBe(true)
    expect(items[2].get('i').classes('el-icon-star-on')).toBe(true)
    expect(items[3].get('i').classes('el-icon-star-on')).toBe(true)
    expect(items[3].get('i').classes('hover')).toBe(true)
    expect(items[4].get('i').classes('el-icon-star-off')).toBe(true)
    expect(items[4].get('i').classes('el-icon-star-on')).not.toBe(true)
  })

  it('初始状态下,鼠标悬浮离开后需要回到之前的初始状态', async () => {
    const wrapper = mount(Rate)

    const fourthItem = wrapper.findAll('.el-rate__item')[3]
    fourthItem.trigger('mouseover')
    fourthItem.trigger('mouseout')

    await flushPromises()
    const items = wrapper.findAll('.el-rate__item')
    expect(items[0].get('i').classes('el-icon-star-off')).toBe(true)
    expect(items[0].get('i').classes('el-icon-star-on')).not.toBe(true)
    expect(items[1].get('i').classes('el-icon-star-off')).toBe(true)
    expect(items[2].get('i').classes('el-icon-star-off')).toBe(true)
    expect(items[3].get('i').classes('el-icon-star-off')).toBe(true)
    expect(items[3].get('i').classes('hover')).not.toBe(true)
    expect(items[4].get('i').classes('el-icon-star-off')).toBe(true)
  })

  // todo -> 之前选中了 2 个 ，  划出的时候应该恢复之前的
  // it('当之前的状态是前两个选中的时候，鼠标悬浮离开后需要回到之前的状态', async () => {
  //   const wrapper = mount(Rate)

  //   // 选中第二个 item
  //   const secondItem = wrapper.findAll('.el-rate__item')[1]
  //   secondItem.trigger('click')
  //   await flushPromises()

  //   const fourthItem = wrapper.findAll('.el-rate__item')[3]
  //   fourthItem.trigger('mouseover')
  //   fourthItem.trigger('mouseout')

  //   await flushPromises()
  //   const items = wrapper.findAll('.el-rate__item')
  //   expect(items[0].get('i').classes('el-icon-star-on')).toBe(true)
  //   expect(items[1].get('i').classes('el-icon-star-on')).toBe(true)
  //   expect(items[2].get('i').classes('el-icon-star-off')).toBe(true)
  //   expect(items[3].get('i').classes('el-icon-star-off')).toBe(true)
  //   expect(items[4].get('i').classes('el-icon-star-off')).toBe(true)
  // })
})
