package com.example.sportgather.service;

import com.example.sportgather.domain.User;
import com.example.sportgather.util.MapUtil;
import com.example.sportgather.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MatchService {
    @Autowired
    private UserRepository userRepository;

    public MatchService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> queryMatesByHobby(String id){
        List<User> list = userRepository.findMatesByHobby(id);
        return list;
    }

    public List<User> queryAllMatesByHobby(String id){
        List<User> list = userRepository.findAllMatesByHobby(id);
        return list;
    }

    public List<User> queryMatesWithSameGender(String id) {
        List<User> users = userRepository.findMatesWithSameGender(id);
        return users;
    }

    private List<User> queryMatesWithDiffGender(String id) {
        List<User> users = userRepository.findMatesWithDiffGender(id);
        return users;
    }

    private List<User> queryMatesWithSameMajor(String id) {
        List<User> users = userRepository.findMatesWithSameMajor(id);
        return users;
    }

    private List<User> queryMatesWithDiffMajor(String id) {
        List<User> users = userRepository.findMatesWithDiffMajor(id);
        return users;
    }

    private List<User> queryMatesByAge(String id) {
        List<User> users = userRepository.findMatesByAge(id);
        return users;
    }


    // params:
    // age = similar / nolimit
    // major = same / diff
    // gender = same / diff
    public Set<String> queryIntersectMates(String id, String age, String gender, String major) {
        List<User> mateByHobby = queryAllMatesByHobby(id); // id, count(common hobby) pair
        Set<String> UserIds = new HashSet<>();

        for (User u: mateByHobby) {
            UserIds.add(u.getUserId());
        }


        if (age.equals("similar")) {
            Set<String> ageSet = new HashSet<>();
            List<User> users = queryMatesByAge(id);
            for (User u: users) {
                ageSet.add(u.getUserId());
            }
            UserIds.retainAll(ageSet);
        }


        if (gender.equals("same")) {
            Set<String> genderSet = new HashSet<>();

            // prefer same gender
            List<User> users = queryMatesWithSameGender(id);
            for (User u: users) {
                genderSet.add(u.getUserId());
            }

            UserIds.retainAll(genderSet);
        } else if (gender.equals("diff")) {
            Set<String> genderSet = new HashSet<>();

            List<User> users = queryMatesWithDiffGender(id);
            for (User u: users) {
                genderSet.add(u.getUserId());
            }

            UserIds.retainAll(genderSet);
        }


        if (major.equals("same")) {
            Set<String> majorSet = new HashSet<>();

            // prefer same major
            List<User> users = queryMatesWithSameMajor(id);

            for (User u: users) {
                majorSet.add(u.getUserId());
            }

            UserIds.retainAll(majorSet);
        } else if (major.equals("diff")){
            Set<String> majorSet = new HashSet<>();

            List<User> users = queryMatesWithDiffMajor(id);
            for (User u: users) {
                majorSet.add(u.getUserId());
            }

            UserIds.retainAll(majorSet);
        }

        return UserIds;
    }
//
//    public Set<String> queryScoreMates(String id, String age, String gender, String major) {
//        Map<String, Integer> scoreMap= new HashMap<>();
//        List<Pair<String, Integer>> mateByHobby = queryAllMatesByHobby(id);
//
//        // add score to shared hobbies
//        for (Pair<String, Integer> u: mateByHobby) {
//            System.out.println(u.getFirst());
//            System.out.println(u.getSecond());
//            System.out.println(u.getSecond().getClass());
//            int score = u.getSecond();
//            if (scoreMap.containsKey(u.getFirst())) {
//                score += scoreMap.get(u.getFirst());
//
//            }
//            scoreMap.put(u.getFirst(), score);
//        }
//
//        // add score to age (similar/nolimit)
//        if (age.equals("similar")) {
//            List<User> users = queryMatesByAge(id);
//
//            for (User u: users) {
//                scoreMap.put(u.getUserId(), scoreMap.get(u.getUserId())+2);
//            }
//        }
//
//        // add gender score
//        if (gender.equals("same")) {
//            List<User> users = queryMatesWithSameGender(id);
//
//            for (User u: users) {
//                scoreMap.put(u.getUserId(), scoreMap.get(u.getUserId())+2);
//            }
//        } else if (gender.equals("diff")) {
//            List<User> users = queryMatesWithDiffGender(id);
//
//            for (User u: users) {
//                scoreMap.put(u.getUserId(), scoreMap.get(u.getUserId())+2);
//            }
//        }
//
//        // add major score
//        if (major.equals("same")) {
//            List<User> users = queryMatesWithSameMajor(id);
//
//            for (User u: users) {
//                scoreMap.put(u.getUserId(), scoreMap.get(u.getUserId())+2);
//            }
//        } else if (major.equals("diff")) {
//            List<User> users = queryMatesWithDiffMajor(id);
//
//            for (User u: users) {
//                scoreMap.put(u.getUserId(), scoreMap.get(u.getUserId())+2);
//            }
//        }
//
//        // sort by scoreMap values
//        Map<String, Integer> sortedMap = MapUtil.sortByValue(scoreMap);
//        return sortedMap.keySet();
//    }
}
