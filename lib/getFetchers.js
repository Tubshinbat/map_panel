import fetcher from "fetcher";
import base from "./base";
import axios from "axios-base";
export const revalidate = 60;

export const getSocialLinks = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/slinks`);
    return { socials: result.data };
  } catch (error) {
    return { error };
  }
};

export const getMembers = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/members?${query}`);
    return { members: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getUserCount = async () => {
  try {
    const result = await axios.get("/users/count");
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getPlaceCount = async () => {
  try {
    const result = await axios.get("/places/count");
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getNewsCount = async () => {
  try {
    const result = await axios.get("/news/count");
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getProduct = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/products/${id}`);
    return { product: result.data };
  } catch (error) {
    return { error };
  }
};

export const getProducts = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/products?${query}`);
    return { products: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getResearch = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/researchs/${id}`);

    return {
      research: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getJob = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/experiences/${id}`);

    return {
      experience: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getReward = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/rewards/${id}`);

    return {
      reward: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getParticipation = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/participations/${id}`);

    return {
      participation: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getMember = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/members/${id}`);
    return {
      member: result.data,
      alternativeMembers: result.alternativeMembers,
    };
  } catch (error) {
    return { error };
  }
};

export const getPartner = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/partners/${id}`);
    return {
      partner: result.data,
    };
  } catch (error) {
    return { error };
  }
};

export const getRateMembers = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/members/rate?${query}`);
    return { members: result.data };
  } catch (error) {
    return { error };
  }
};

export const getNews = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/news?${query}`);

    return { news: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getPartners = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/partners?${query}`);
    return { partners: result.data, pagination: result.pagination };
  } catch (error) {
    return { error };
  }
};

export const getNewsCategories = async (query) => {
  try {
    const result = await fetcher(`${base.apiUrl}/news-categories?${query}`);
    return { newsCategories: result.data };
  } catch (error) {
    return { error };
  }
};

export const getMemberCategories = async () => {
  try {
    const result = await fetcher(`${base.apiUrl}/member-categories`);
    return { categories: result.data };
  } catch (error) {
    return { error };
  }
};

export const getIdNews = async (id) => {
  try {
    const result = await fetcher(`${base.apiUrl}/news/${id}`);
    return { news: result.data };
  } catch (error) {
    return { error };
  }
};
