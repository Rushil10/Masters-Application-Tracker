export const getObject = (field, score) => {
  var obj = {};
  if (field === 'GRE') {
    obj.gre_score = score;
  } else if (field === 'GMAT') {
    obj.gmat_score = score;
  } else if (field === 'GMAT') {
    obj.gmat_score = score;
  } else if (field === 'GATE') {
    obj.gate_score = score;
  } else if (field === 'CAT') {
    obj.cat_score = score;
  } else if (field === 'TOEFL') {
    obj.toefl_score = score;
  } else if (field === 'IELTS') {
    obj.ielts_score = score;
  }
  return obj;
};
