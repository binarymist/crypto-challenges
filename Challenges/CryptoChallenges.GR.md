Drop on #general channel on Fridays


I've got a bunch of crypto programming challenges for all interested parties (incl @devs, @security_squad).
These are supposed to be challenges, not puzzles. Use your language of choice, could also be a good way of learning a new language at the same time.

If you're not that familiar with crypto already, or if your familiarity comes mostly from things like Applied Cryptography, this fact may surprise you:
most crypto is fatally broken.
The systems we're relying on today that aren't known to be fatally broken are in a state of just waiting to be fatally broken.
Nobody is sure that TLS 1.2 or SSH 2 or OTR are going to remain safe as designed.

The current state of crypto software security is similar to the state of software security in the 1990s. Specifically:
until around 1995, it was not common knowledge that software built by humans might have trouble counting.
As a result, nobody could size a buffer properly, and humanity incurred billions of dollars in cleanup after a decade and a half of emergency fixes for memory corruption vulnerabilities.

Counting is not a hard problem. But cryptography is. There are just a few things you can screw up to get the size of a buffer wrong.
There are tens, probably hundreds, of obscure little things you can do to take a cryptosystem that should be secure even against an adversary with more CPU cores than there are atoms in the solar system,
and make it solveable with a small script and 15 seconds. Don't take my word for it though: do the challenges and you'll see.

Some details around KDFs and how they're designed to withstand todays hardware (https://f1.holisticinfosecforwebdevelopers.com/chap06.html#web-applications-countermeasures-data-store-compromise) for those interested.

Anyway... enough rambling.

We'll be starting off with fairly easy challenges and slowly progressing to more difficult.


# Challenge 1

## Convert hex to base64

The string:

49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d

Should produce:

SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t

Go ahead and make that happen. You'll need to use this code for the rest of the exercises. So don't throw it away after you've created it.

## Rule

Always operate on raw bytes, never on encoded strings. Only use hex and base64 for pretty-printing.


# Challenge 2

## Fixed XOR

Write a function that takes two equal-length buffers and produces their XOR combination.

If your function works properly, then when you feed it the string:

1c0111001f010100061a024b53535009181c

after hex decoding, and when XOR'd against:

686974207468652062756c6c277320657965

should produce:

746865206b696420646f6e277420706c6179

## Rule

Remember in challenge I mentioned you'd need to reuse the challenge 1 code in the rest of the exercises.


# Challenge 3

## Single-byte XOR cipher

The following hex encoded string:

99B8BAAFF6B7F6A5A3A4B0B3A4F6BDB8B9A1A5F6A2BEB3F6B0B3B3BABFB8B1

has been XOR'd against a single character. Find the key and decrypt the message.

This can be done by hand, but don't do that, write code that does it utilising as many functions from the previous chaallenges I've given you.

How do we do this? Create a method for scoring a piece of English plaintext. Character frequency is a good metric. Evaluate each output and choose the one with the best score.

Your program should print the hex key that was used to XOR the hex encoded string along with the decoded string.

When you've done this you'll be able to make surfing jokes about me.



