export default {
  data() {
    return {
      args: [
        // default arguments here
      ]
    }
  },
  methods: {
    emit(callback, args) {
      args = args || this.args
      this.$emit('change', callback, args)
    },
  },
}
