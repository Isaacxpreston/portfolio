export default {
  methods: {
    applyChange(callback, args) {
      this[callback].apply(null, args)
    }
  }
}
