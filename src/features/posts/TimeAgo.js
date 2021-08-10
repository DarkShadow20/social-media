import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return <p className="text-sm text-gray-700">{timeAgo}</p>;
};