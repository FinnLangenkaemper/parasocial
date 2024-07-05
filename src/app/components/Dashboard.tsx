import { creators } from "@/config/creators"
import { supabase } from "@/lib/supabase"
import { error } from "console"
import { useState, useEffect } from "react"

const Dashboard = ({userId}: {userId: string | undefined}) => {
    const [ subbed, setSubbed ] = useState([])

    useEffect(() => {
        const checkedSubbed = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('subbed')
                .eq('user_id', userId)
                
            if(error) {console.log('error while checking subbed', error)}
            if(data) {
                let subbedArr = data[0].subbed
                if(subbedArr === null){
                    console.log('no data yet')
                } else {

                    setSubbed(subbedArr)
                }
            }
        }

        checkedSubbed()

    })


    const handleSubscribe = async (creator: string) => {
        console.log(creator)
        console.log(userId)

        const updatedSubbed = [...subbed, creator]

        const { error } = await supabase
            .from('users')
            .update({ subbed: updatedSubbed})
            .eq('user_id', userId)
        
            if(error) console.log(error)
    }

  return (
    <div className="p-12 flex gap-4">
        {creators.map((item, index) => {
            return (
            <button onClick={() => handleSubscribe(item.creator)} className="border-2 p-2 rounded-lg" key={index}>
              {item.creator}
            </button>)
        })}
    </div>
  )
}

export default Dashboard