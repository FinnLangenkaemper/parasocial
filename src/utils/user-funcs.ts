import { supabase } from "@/lib/supabase";


//subscribes you to the creator 
export const handleSubscribe = async (creator: string, subbed: string[], userId: string | undefined ) => {

    if(userId !== undefined) {
        const updatedSubbed = [...subbed, creator];

    const { error } = await supabase
      .from("users")
      .update({ subbed: updatedSubbed })
      .eq("user_id", userId);

    if (error) console.log(error);
    } else {
        console.error('User is not logged in, cannot subscribe')
    }
    
  };


  //unsubscribes you from the creator 
  export const handleUnsubscribe = async (creator: string, subbed: string[], userId: string | undefined) => {

    if(userId !== undefined) { 
        const updatedSubbed = subbed.filter((item) => item !== creator);

        const { error } = await supabase
        .from("users")
        .update({ subbed: updatedSubbed })
        .eq("user_id", userId);

        if (error) console.log(error);
    } else {
        console.error('User is not logged in, cannot unsubscribe')
    }
    
    
  };

  //checks if you are subbed to a creator
  export const checkSubscribed = (creator: string, subbed: string[]) => {
    let isSubbed = false;
    subbed.map((item) => {
      if (item === creator) {
        isSubbed = true;
      }
    });

    return isSubbed;
  };

  
  //check user exist 
  export const checkUserExists = async (userId: any) => {
    let userExists

    const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', userId)

    if(error) { userExists = false }
    if(data) { userExists = true }

    return userExists
  }