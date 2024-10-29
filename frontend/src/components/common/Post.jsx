import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../utils/date";

const Post = ({ post }) => {
	
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const queryClient = useQueryClient();
	
	

	

	const formattedDate = formatPostDate(post.createdAt);



	return (
		<>
			 <tr className="bg-base-200">
        		<th>{formattedDate}</th>
        		<td>{post.gyartasiido}</td>
        		<td>{post.cikkszam}</td>
        		<td>{post.sorozatszam}</td>
      		</tr>
		</>
	);
};
export default Post;
