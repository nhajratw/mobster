module Tip exposing (..)

import Html exposing (..)
import Random
import Array


type alias Tip msg =
    { url : String
    , body : Html msg
    , title : String
    }


get : Int -> Tip msg
get index =
    let
        maybeTip =
            Array.get index (Array.fromList tips)
    in
        Maybe.withDefault emptyTip maybeTip


random : Random.Generator Int
random =
    (Random.int 0 ((List.length tips) - 1))


emptyTip : Tip msg
emptyTip =
    { url = "", title = "", body = text "" }


tips : List (Tip msg)
tips =
    [ { url = "http://llewellynfalco.blogspot.com/2014/06/llewellyns-strong-style-pairing.html"
      , body =
            blockquote []
                [ p [] [ text "This is an old version" ]
                , small [] [ text "Anonymous" ]
                ]
      , title = "You Haven't Updated Yet"
      }
    ]
