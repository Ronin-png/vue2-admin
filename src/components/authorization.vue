<script>
import { check } from '../utils/auth'
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true,
    }
  } ,
  render: function(h, context) {
    debugger
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  }
}
</script>