export default interface UserInterface {
  items: Array<{
    id?: String | null
    email?: String | null
    name?: String | null
    nickname?: String | null
    role?: String | null
  }>
  count?: number | string | 0
}
