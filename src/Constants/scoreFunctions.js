import {reachColor, safetyColor, targetColor} from '../styles/ThemeStyles';

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

export const tagColor = tag => {
  if (tag === 'Safety') {
    return safetyColor;
  } else if (tag === 'Reach') {
    return reachColor;
  } else {
    return targetColor;
  }
};

export const applicationCardEmoji = status => {
  if (status === 'Accepted') {
    return '🎉';
  } else if (status === 'Applied') {
    return '🤞';
  } else {
    return '';
  }
};

export const sortByFess = async applications => {
  await applications.sort((a, b) => {
    return a.degreeFees - b.degreeFees;
  });
  return applications;
};

export const sortByApplicationFees = async applications => {
  await applications.sort((a, b) => {
    return a.applicationFees - b.applicationFees;
  });
  return applications;
};

export const sortByDate = async applications => {
  await applications.sort((a, b) => {
    return new Date(a.appliedAt) - new Date(b.appliedAt);
  });
  return applications;
};

export const sortByTag = async applications => {
  var tag = ['Safety', 'Reach', 'Target'];
  await applications.sort((a, b) => {
    return tag.indexOf(a.tag) - tag.indexOf(b.tag);
  });
  return applications;
};
