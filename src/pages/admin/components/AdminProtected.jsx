import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { getProfile } from "../../../services/index/user";

export default function AdminProtected({ children }) {
  const {data: user, isPending, isError} = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return getProfile()
    }
  })
  // const user = useSelector((state) => state.userSlice);
  return user?.admin ? children : <Navigate to='/' /> ;
}
