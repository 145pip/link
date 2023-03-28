import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPath, connectEdge } from "../utils/path";
import {
  setEdgeFromCoordinates,
  setEdgeToCoordinates,
} from "../redux/edgeLinkSlice";

export default function usePath(startingCoordinate, coordinates) {
  const dispatch = useDispatch();
  const isLinked = useSelector(state => state.edgeLink.isLinked);
  const linkEdge = useSelector(state => state.edgeLink.linkEdge);
  const [path, setPath] = useState(createPath(startingCoordinate, coordinates));

  useEffect(() => {
    if (isLinked) {
      const result = connectEdge(path, linkEdge, coordinates);
      setPath(result.path);
      dispatch(setEdgeFromCoordinates(result.edgeFromCoordinates));
      dispatch(setEdgeToCoordinates(result.edgeToCoordinates));
    }
  }, [isLinked]);

  return path;
}
