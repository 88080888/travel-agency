import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, changeDurationFrom, changeDurationTo, addTag, removeTag} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  // TODO - add more dispatchers for other filters
  changeDurationFrom: (type,value) => dispatch(changeDurationFrom(type,value)),
  changeDurationTo: (type,value) => dispatch(changeDurationTo(type,value)),
  addTag: (tag) => dispatch(addTag(tag)),
  removeTag: (tag) => dispatch(removeTag(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
